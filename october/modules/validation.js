/**
 * Validation Module for DolReal Swedish Health Bus Schedule System
 * Validates API keys, configuration, and system requirements
 * ES6+ Module Pattern
 */

import { Utility } from './utility.js';

export const Validation = (() => {
  'use strict';

  /**
   * Validation commands available to the system
   */
  const commands = {
    CHECK_GEMINI_API: 'check-gemini-api',
    CHECK_ENV: 'check-env',
    CHECK_BROWSER: 'check-browser',
    CHECK_ALL: 'check-all'
  };

  /**
   * Validate Gemini API Key format
   * @param {string} apiKey - API key to validate
   * @returns {Object} Validation result {valid: boolean, message: string}
   */
  const validateApiKeyFormat = (apiKey) => {
    if (!apiKey || typeof apiKey !== 'string') {
      return {
        valid: false,
        message: Utility.getErrorMessage('MISSING_API_KEY')
      };
    }

    // Gemini API keys typically start with "AIza" and are ~39 characters
    const apiKeyPattern = /^AIza[a-zA-Z0-9_-]{35,}$/;
    
    if (!apiKeyPattern.test(apiKey)) {
      return {
        valid: false,
        message: Utility.getErrorMessage('INVALID_API_KEY')
      };
    }

    return {
      valid: true,
      message: 'API-nyckeln har giltigt format (API key format is valid)'
    };
  };

  /**
   * Check if Gemini API is configured and accessible
   * @returns {Promise<Object>} Validation result
   */
  const checkGeminiAPI = async () => {
    const apiKey = Utility.getEnvVar('GEMINI_API_KEY');
    
    // Check if API key exists
    if (!apiKey) {
      return {
        valid: false,
        message: Utility.getErrorMessage('MISSING_API_KEY'),
        details: {
          configured: false,
          format: false,
          accessible: false
        }
      };
    }

    // Validate API key format
    const formatValidation = validateApiKeyFormat(apiKey);
    if (!formatValidation.valid) {
      return {
        valid: false,
        message: formatValidation.message,
        details: {
          configured: true,
          format: false,
          accessible: false
        }
      };
    }

    // Test API accessibility (lightweight check)
    try {
      const testUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return {
          valid: true,
          message: 'Gemini API är konfigurerad och tillgänglig (Gemini API is configured and accessible)',
          details: {
            configured: true,
            format: true,
            accessible: true
          }
        };
      } else {
        return {
          valid: false,
          message: `API-fel: ${response.status} - ${response.statusText}`,
          details: {
            configured: true,
            format: true,
            accessible: false
          }
        };
      }
    } catch (error) {
      return {
        valid: false,
        message: Utility.getErrorMessage('NETWORK_ERROR'),
        details: {
          configured: true,
          format: true,
          accessible: false,
          error: error.message
        }
      };
    }
  };

  /**
   * Check environment configuration
   * @returns {Object} Environment check result
   */
  const checkEnvironment = () => {
    const results = {
      valid: true,
      checks: []
    };

    // Check GEMINI_API_KEY
    const apiKey = Utility.getEnvVar('GEMINI_API_KEY');
    results.checks.push({
      name: 'GEMINI_API_KEY',
      status: apiKey ? '✓ Konfigurerad' : '✗ Saknas',
      valid: !!apiKey
    });

    if (!apiKey) {
      results.valid = false;
    }

    // Check for optional YouTube API key
    const youtubeKey = Utility.getEnvVar('YOUTUBE_API_KEY');
    results.checks.push({
      name: 'YOUTUBE_API_KEY',
      status: youtubeKey ? '✓ Konfigurerad' : '⚠ Valfri (Optional)',
      valid: true // Optional, so doesn't affect overall validity
    });

    return results;
  };

  /**
   * Check browser compatibility
   * @returns {Object} Browser compatibility check result
   */
  const checkBrowser = () => {
    const results = {
      valid: true,
      checks: []
    };

    // Check Fetch API
    results.checks.push({
      name: 'Fetch API',
      status: window.fetch ? '✓ Stöds' : '✗ Stöds ej',
      valid: !!window.fetch
    });

    // Check ES6 Modules
    const supportsES6Modules = 'noModule' in document.createElement('script');
    results.checks.push({
      name: 'ES6 Modules',
      status: supportsES6Modules ? '✓ Stöds' : '✗ Stöds ej',
      valid: supportsES6Modules
    });

    // Check LocalStorage
    let hasLocalStorage = false;
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      hasLocalStorage = true;
    } catch (e) {
      hasLocalStorage = false;
    }
    results.checks.push({
      name: 'LocalStorage',
      status: hasLocalStorage ? '✓ Stöds' : '✗ Stöds ej',
      valid: hasLocalStorage
    });

    // Check HTTPS (recommended for secure API calls)
    const isSecure = Utility.isSecureContext();
    results.checks.push({
      name: 'Säker kontext (HTTPS)',
      status: isSecure ? '✓ Aktiv' : '⚠ Rekommenderas',
      valid: true // Not required but recommended
    });

    // Overall validity
    results.valid = results.checks.every(check => check.valid);

    return results;
  };

  /**
   * Run all validation checks
   * @returns {Promise<Object>} Complete validation result
   */
  const checkAll = async () => {
    Utility.log.info('Kör alla valideringar (Running all validations)...');

    const results = {
      timestamp: Utility.formatTimestamp(),
      valid: true,
      geminiAPI: null,
      environment: null,
      browser: null
    };

    // Check Gemini API
    results.geminiAPI = await checkGeminiAPI();
    
    // Check environment
    results.environment = checkEnvironment();
    
    // Check browser
    results.browser = checkBrowser();

    // Overall validity
    results.valid = results.geminiAPI.valid && 
                   results.environment.valid && 
                   results.browser.valid;

    // Log results
    if (results.valid) {
      Utility.log.success('Alla valideringar godkända (All validations passed)');
    } else {
      Utility.log.error('Vissa valideringar misslyckades (Some validations failed)');
    }

    return results;
  };

  /**
   * Display validation results in UI
   * @param {Object} results - Validation results
   */
  const displayResults = (results) => {
    const container = document.getElementById('validation-results');
    if (!container) {
      Utility.log.warn('Valideringscontainer saknas (Validation container missing)');
      return;
    }

    let html = '<div class="validation-results">';
    html += `<h3>Valideringsresultat - ${results.timestamp}</h3>`;

    // Gemini API results
    html += '<div class="validation-section">';
    html += '<h4>Gemini API</h4>';
    html += `<p class="${results.geminiAPI.valid ? 'valid' : 'invalid'}">${results.geminiAPI.message}</p>`;
    html += '</div>';

    // Environment results
    html += '<div class="validation-section">';
    html += '<h4>Miljökonfiguration</h4>';
    html += '<ul>';
    results.environment.checks.forEach(check => {
      html += `<li class="${check.valid ? 'valid' : 'invalid'}">${check.name}: ${check.status}</li>`;
    });
    html += '</ul>';
    html += '</div>';

    // Browser results
    html += '<div class="validation-section">';
    html += '<h4>Webbläsarkompatibilitet</h4>';
    html += '<ul>';
    results.browser.checks.forEach(check => {
      html += `<li class="${check.valid ? 'valid' : 'invalid'}">${check.name}: ${check.status}</li>`;
    });
    html += '</ul>';
    html += '</div>';

    html += '</div>';
    container.innerHTML = html;
  };

  /**
   * Execute validation command
   * @param {string} command - Command to execute
   * @returns {Promise<Object>} Command result
   */
  const executeCommand = async (command) => {
    switch (command) {
      case commands.CHECK_GEMINI_API:
        return await checkGeminiAPI();
      
      case commands.CHECK_ENV:
        return checkEnvironment();
      
      case commands.CHECK_BROWSER:
        return checkBrowser();
      
      case commands.CHECK_ALL:
        return await checkAll();
      
      default:
        return {
          valid: false,
          message: `Okänt kommando: ${command}`
        };
    }
  };

  // Public API
  return {
    commands,
    validateApiKeyFormat,
    checkGeminiAPI,
    checkEnvironment,
    checkBrowser,
    checkAll,
    displayResults,
    executeCommand
  };
})();
