/**
 * Gemini API Module for DolReal Swedish Health Bus Schedule System
 * Provides Gemini API integration for all four agents
 * ES6+ Module Pattern with secure secret management
 * 
 * @version 1.0.0
 * @author DolReal System
 */

import { Utility } from './utility.js';
import { Validation } from './validation.js';

export const GeminiAPI = (() => {
  'use strict';

  // Configuration
  const config = {
    apiBaseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    defaultModel: 'gemini-2.5-pro',
    timeout: 30000, // 30 seconds
    maxRetries: 3,
    retryDelay: 1000 // 1 second
  };

  // API state
  let apiKey = null;
  let isInitialized = false;

  /**
   * Initialize the Gemini API module
   * @param {Object} options - Configuration options
   * @param {string} options.apiKey - Gemini API key (optional if set in env)
   * @returns {Promise<Object>} Initialization result
   */
  const initialize = async (options = {}) => {
    Utility.log.info('Initierar Gemini API-modul (Initializing Gemini API module)...');

    // Destructure apiKey from options, fallback to environment variable
    const { apiKey: providedApiKey } = options;
    apiKey = providedApiKey || Utility.getEnvVar('GEMINI_API_KEY');

    if (!apiKey) {
      const errorMsg = Utility.getErrorMessage('MISSING_API_KEY');
      Utility.log.error(errorMsg);
      Utility.showNotification(errorMsg, 'error');
      
      return {
        success: false,
        message: errorMsg
      };
    }

    // Validate API key format
    const validation = Validation.validateApiKeyFormat(apiKey);
    if (!validation.valid) {
      Utility.log.error(validation.message);
      Utility.showNotification(validation.message, 'error');
      
      return {
        success: false,
        message: validation.message
      };
    }

    // Test API connectivity
    try {
      const testResult = await testConnection();
      if (testResult.success) {
        isInitialized = true;
        Utility.log.success('Gemini API initierad framgångsrikt (Gemini API initialized successfully)');
        Utility.showNotification('Gemini API ansluten', 'success');
        
        return {
          success: true,
          message: 'API initierad framgångsrikt'
        };
      } else {
        return testResult;
      }
    } catch (error) {
      const errorMsg = `Initieringsfel: ${error.message}`;
      Utility.log.error(errorMsg);
      
      return {
        success: false,
        message: errorMsg,
        error
      };
    }
  };

  /**
   * Test connection to Gemini API
   * @returns {Promise<Object>} Connection test result
   */
  const testConnection = async () => {
    try {
      const url = `${config.apiBaseUrl}?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Anslutning till Gemini API lyckades'
        };
      } else {
        const errorText = await response.text();
        return {
          success: false,
          message: `API-fel: ${response.status}`,
          details: errorText
        };
      }
    } catch (error) {
      return {
        success: false,
        message: Utility.getErrorMessage('NETWORK_ERROR'),
        error: error.message
      };
    }
  };

  /**
   * Generate content using Gemini API
   * @param {string} prompt - The prompt to send
   * @param {Object} options - Generation options
   * @param {string} options.model - Model to use (default: gemini-2.5-pro)
   * @param {number} options.temperature - Temperature (0-1)
   * @param {number} options.maxOutputTokens - Max output tokens
   * @returns {Promise<Object>} Generated content result
   */
  const generateContent = async (prompt, options = {}) => {
    if (!isInitialized) {
      const errorMsg = 'API inte initierad. Anropa initialize() först.';
      Utility.log.error(errorMsg);
      return {
        success: false,
        message: errorMsg
      };
    }

    if (!prompt || typeof prompt !== 'string') {
      const errorMsg = 'Ogiltig prompt angiven';
      Utility.log.error(errorMsg);
      return {
        success: false,
        message: errorMsg
      };
    }

    const model = options.model || config.defaultModel;
    const temperature = options.temperature ?? 0.7;
    const maxOutputTokens = options.maxOutputTokens || 8192;

    const url = `${config.apiBaseUrl}/${model}:generateContent?key=${apiKey}`;
    
    const requestBody = {
      contents: [{
        role: 'user',
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature,
        topK: 40,
        topP: 0.95,
        maxOutputTokens
      }
    };

    Utility.log.info(`Skickar förfrågan till Gemini (${model})...`);

    try {
      const response = await fetchWithRetry(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      // Check for API errors
      if (data.error) {
        Utility.log.error('Gemini API-fel:', data.error);
        return {
          success: false,
          message: `API-fel: ${data.error.message || 'Okänt fel'}`,
          error: data.error
        };
      }

      // Extract generated text
      const text = data.candidates?.[0]?.content?.parts?.map(p => p.text).join('\n') ?? '';

      if (!text) {
        return {
          success: false,
          message: Utility.getErrorMessage('INVALID_RESPONSE')
        };
      }

      Utility.log.success(`Mottog svar: ${text.length} tecken`);

      return {
        success: true,
        text,
        model,
        metadata: {
          candidatesCount: data.candidates?.length || 0,
          finishReason: data.candidates?.[0]?.finishReason,
          safetyRatings: data.candidates?.[0]?.safetyRatings
        }
      };

    } catch (error) {
      Utility.log.error('Fel vid generering:', error);
      return {
        success: false,
        message: error.message,
        error
      };
    }
  };

  /**
   * Fetch with retry logic
   * @param {string} url - URL to fetch
   * @param {Object} options - Fetch options
   * @param {number} retries - Number of retries left
   * @returns {Promise<Response>} Fetch response
   */
  const fetchWithRetry = async (url, options, retries = config.maxRetries) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok && retries > 0 && response.status >= 500) {
        // Retry on server errors
        Utility.log.warn(`Försök igen om ${config.retryDelay}ms... (${retries} försök kvar)`);
        await new Promise(resolve => setTimeout(resolve, config.retryDelay));
        return fetchWithRetry(url, options, retries - 1);
      }

      return response;

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(Utility.getErrorMessage('TIMEOUT'));
      }

      if (retries > 0) {
        Utility.log.warn(`Nätverksfel, försöker igen... (${retries} försök kvar)`);
        await new Promise(resolve => setTimeout(resolve, config.retryDelay));
        return fetchWithRetry(url, options, retries - 1);
      }

      throw error;
    }
  };

  /**
   * List available models
   * @returns {Promise<Object>} List of models
   */
  const listModels = async () => {
    if (!isInitialized) {
      return {
        success: false,
        message: 'API inte initierad'
      };
    }

    try {
      const url = `${config.apiBaseUrl}?key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.models) {
        return {
          success: true,
          models: data.models.map(m => ({
            name: m.name,
            displayName: m.displayName,
            description: m.description
          }))
        };
      } else {
        return {
          success: false,
          message: 'Kunde inte hämta modeller',
          error: data.error
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message,
        error
      };
    }
  };

  /**
   * Get module status
   * @returns {Object} Current module status
   */
  const getStatus = () => {
    return {
      initialized: isInitialized,
      hasApiKey: !!apiKey,
      apiKeyValid: apiKey ? Validation.validateApiKeyFormat(apiKey).valid : false,
      config: {
        model: config.defaultModel,
        timeout: config.timeout,
        maxRetries: config.maxRetries
      }
    };
  };

  /**
   * Update configuration
   * @param {Object} newConfig - New configuration values
   */
  const updateConfig = (newConfig) => {
    if (newConfig.defaultModel) {
      config.defaultModel = newConfig.defaultModel;
    }
    if (newConfig.timeout) {
      config.timeout = newConfig.timeout;
    }
    if (newConfig.maxRetries) {
      config.maxRetries = newConfig.maxRetries;
    }
    Utility.log.info('Konfiguration uppdaterad');
  };

  /**
   * Reset module state
   */
  const reset = () => {
    apiKey = null;
    isInitialized = false;
    Utility.log.info('Gemini API-modul återställd');
  };

  // Public API
  return {
    initialize,
    testConnection,
    generateContent,
    listModels,
    getStatus,
    updateConfig,
    reset,
    
    // Expose config for read-only access
    get config() {
      return { ...config };
    }
  };
})();
