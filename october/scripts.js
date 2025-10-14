/**
 * Main Application Script for DolReal Swedish Health Bus Schedule System
 * Initializes all four agents with Gemini API integration
 * ES6+ Module Pattern
 */

import { Utility } from './modules/utility.js';
import { Validation } from './modules/validation.js';
import { GeminiAPI } from './modules/gemini-api-module.js';

/**
 * Application initialization
 */
document.addEventListener('DOMContentLoaded', async () => {
  Utility.log.info('Startar DolReal Swedish Health Bus Schedule System...');

  // Initialize UI elements
  initializeUI();

  // Check for existing API key and auto-initialize
  const existingApiKey = Utility.getEnvVar('GEMINI_API_KEY');
  if (existingApiKey) {
    Utility.log.info('Befintlig API-nyckel hittad, initierar...');
    const result = await GeminiAPI.initialize();
    if (result.success) {
      updateSystemStatus();
    }
  }

  // Display initial system status
  updateSystemStatus();
});

/**
 * Initialize UI event listeners and handlers
 */
function initializeUI() {
  // Save API Key button
  const saveApiKeyBtn = document.getElementById('save-api-key');
  if (saveApiKeyBtn) {
    saveApiKeyBtn.addEventListener('click', handleSaveApiKey);
  }

  // Test Connection button
  const testConnectionBtn = document.getElementById('test-connection');
  if (testConnectionBtn) {
    testConnectionBtn.addEventListener('click', handleTestConnection);
  }

  // Validation buttons
  document.getElementById('validate-gemini')?.addEventListener('click', () => {
    handleValidation(Validation.commands.CHECK_GEMINI_API);
  });

  document.getElementById('validate-env')?.addEventListener('click', () => {
    handleValidation(Validation.commands.CHECK_ENV);
  });

  document.getElementById('validate-browser')?.addEventListener('click', () => {
    handleValidation(Validation.commands.CHECK_BROWSER);
  });

  document.getElementById('validate-all')?.addEventListener('click', () => {
    handleValidation(Validation.commands.CHECK_ALL);
  });

  // Generate Content button
  const generateBtn = document.getElementById('generate-content');
  if (generateBtn) {
    generateBtn.addEventListener('click', handleGenerateContent);
  }

  Utility.log.success('UI initierad');
}

/**
 * Handle save API key action
 */
async function handleSaveApiKey() {
  const input = document.getElementById('gemini-api-key');
  const apiKey = input?.value?.trim();

  if (!apiKey) {
    Utility.showNotification('Vänligen ange en API-nyckel', 'error');
    return;
  }

  // Validate format
  const validation = Validation.validateApiKeyFormat(apiKey);
  if (!validation.valid) {
    Utility.showNotification(validation.message, 'error');
    return;
  }

  // Save to localStorage
  Utility.setEnvVar('GEMINI_API_KEY', apiKey);

  // Initialize the API
  const result = await GeminiAPI.initialize({ apiKey });
  
  if (result.success) {
    Utility.showNotification('API-nyckel sparad och API initierad', 'success');
    // Clear the input for security
    if (input) {
      input.value = '';
    }
    updateSystemStatus();
  } else {
    Utility.showNotification(result.message, 'error');
  }
}

/**
 * Handle test connection action
 */
async function handleTestConnection() {
  Utility.log.info('Testar anslutning till Gemini API...');
  Utility.showNotification('Testar anslutning...', 'info');

  const result = await GeminiAPI.testConnection();
  
  if (result.success) {
    Utility.showNotification(result.message, 'success');
  } else {
    Utility.showNotification(result.message, 'error');
  }
}

/**
 * Handle validation command execution
 * @param {string} command - Validation command to execute
 */
async function handleValidation(command) {
  Utility.log.info(`Kör validering: ${command}`);
  
  const resultsDiv = document.getElementById('validation-results');
  if (resultsDiv) {
    resultsDiv.innerHTML = '<p class="loading">Kör validering...</p>';
  }

  const results = await Validation.executeCommand(command);

  // Display results in UI
  if (command === Validation.commands.CHECK_ALL) {
    Validation.displayResults(results);
  } else {
    // Display single check results
    if (resultsDiv) {
      let html = '<div class="validation-results">';
      html += `<h3>Valideringsresultat - ${Utility.formatTimestamp()}</h3>`;
      
      if (typeof results.valid !== 'undefined') {
        html += `<p class="${results.valid ? 'valid' : 'invalid'}">${results.message}</p>`;
      }
      
      if (results.checks) {
        html += '<ul>';
        results.checks.forEach(check => {
          html += `<li class="${check.valid ? 'valid' : 'invalid'}">${check.name}: ${check.status}</li>`;
        });
        html += '</ul>';
      }
      
      html += '</div>';
      resultsDiv.innerHTML = html;
    }
  }
}

/**
 * Handle content generation
 */
async function handleGenerateContent() {
  const promptTextarea = document.getElementById('test-prompt');
  const resultsDiv = document.getElementById('generation-results');
  
  const prompt = promptTextarea?.value?.trim();
  
  if (!prompt) {
    Utility.showNotification('Vänligen ange en testprompt', 'error');
    return;
  }

  // Show loading state
  if (resultsDiv) {
    resultsDiv.innerHTML = '<p class="loading">Genererar innehåll...</p>';
  }

  Utility.log.info('Genererar innehåll med Gemini API...');

  // Generate content
  const result = await GeminiAPI.generateContent(prompt);

  // Display results
  if (resultsDiv) {
    let html = '<div class="generation-result">';
    html += `<h3>Genereringsresultat - ${Utility.formatTimestamp()}</h3>`;
    
    if (result.success) {
      html += '<div class="result-success">';
      html += `<p><strong>Modell:</strong> ${result.model}</p>`;
      html += `<p><strong>Längd:</strong> ${result.text.length} tecken</p>`;
      html += '<div class="generated-text">';
      html += `<h4>Genererat innehåll:</h4>`;
      html += `<pre>${Utility.sanitizeInput(result.text)}</pre>`;
      html += '</div>';
      
      if (result.metadata) {
        html += '<details>';
        html += '<summary>Metadata</summary>';
        html += `<pre>${JSON.stringify(result.metadata, null, 2)}</pre>`;
        html += '</details>';
      }
      
      html += '</div>';
      Utility.showNotification('Innehåll genererat framgångsrikt', 'success');
    } else {
      html += '<div class="result-error">';
      html += `<p class="error">${result.message}</p>`;
      html += '</div>';
      Utility.showNotification('Generering misslyckades', 'error');
    }
    
    html += '</div>';
    resultsDiv.innerHTML = html;
  }
}

/**
 * Update system status display
 */
function updateSystemStatus() {
  const statusDiv = document.getElementById('system-status');
  if (!statusDiv) return;

  const status = GeminiAPI.getStatus();
  const envStatus = Validation.checkEnvironment();
  const browserStatus = Validation.checkBrowser();

  let html = '<div class="status-grid">';
  
  // API Status
  html += '<div class="status-card">';
  html += '<h3>Gemini API</h3>';
  html += `<p class="${status.initialized ? 'valid' : 'invalid'}">`;
  html += status.initialized ? '✓ Initierad' : '✗ Inte initierad';
  html += '</p>';
  html += `<p>API-nyckel: ${status.hasApiKey ? '✓ Konfigurerad' : '✗ Saknas'}</p>`;
  html += `<p>Modell: ${status.config.model}</p>`;
  html += '</div>';

  // Environment Status
  html += '<div class="status-card">';
  html += '<h3>Miljökonfiguration</h3>';
  envStatus.checks.forEach(check => {
    html += `<p class="${check.valid ? 'valid' : 'invalid'}">${check.name}: ${check.status}</p>`;
  });
  html += '</div>';

  // Browser Status
  html += '<div class="status-card">';
  html += '<h3>Webbläsare</h3>';
  browserStatus.checks.forEach(check => {
    html += `<p class="${check.valid ? 'valid' : 'invalid'}">${check.name}: ${check.status}</p>`;
  });
  html += '</div>';

  // Agent Status
  html += '<div class="status-card">';
  html += '<h3>Agenter</h3>';
  html += '<p>Agent 1: Redo</p>';
  html += '<p>Agent 2: Redo</p>';
  html += '<p>Agent 3: Redo</p>';
  html += '<p>Agent 4: Redo</p>';
  html += '</div>';

  html += '</div>';
  
  statusDiv.innerHTML = html;
}

// Export for testing or external use
export {
  initializeUI,
  handleSaveApiKey,
  handleTestConnection,
  handleValidation,
  handleGenerateContent,
  updateSystemStatus
};
