/**
 * Utility Module for DolReal Swedish Health Bus Schedule System
 * Shared helper functions used across all four agents
 * ES6+ Module Pattern
 */

export const Utility = (() => {
  'use strict';

  /**
   * Logger utility with Swedish labels
   */
  const log = {
    info: (message, ...args) => {
      console.log(`[INFO] ${message}`, ...args);
    },
    error: (message, ...args) => {
      console.error(`[FEL] ${message}`, ...args);
    },
    warn: (message, ...args) => {
      console.warn(`[VARNING] ${message}`, ...args);
    },
    success: (message, ...args) => {
      console.log(`[FRAMGÅNG] ${message}`, ...args);
    }
  };

  /**
   * Check if running in secure context (required for some features)
   */
  const isSecureContext = () => {
    return window.isSecureContext || window.location.protocol === 'https:';
  };

  /**
   * Get environment variable (from global config or localStorage)
   * @param {string} key - Environment variable key
   * @returns {string|null} Value or null if not found
   */
  const getEnvVar = (key) => {
    // First check window.ENV if set by server
    if (window.ENV && window.ENV[key]) {
      return window.ENV[key];
    }
    
    // Fallback to localStorage (for development)
    try {
      return localStorage.getItem(`ENV_${key}`);
    } catch (e) {
      log.warn('LocalStorage inte tillgänglig (localStorage not available)');
      return null;
    }
  };

  /**
   * Set environment variable (localStorage only, for development)
   * @param {string} key - Environment variable key
   * @param {string} value - Value to set
   */
  const setEnvVar = (key, value) => {
    try {
      localStorage.setItem(`ENV_${key}`, value);
      log.success(`Miljövariabel satt (Environment variable set): ${key}`);
    } catch (e) {
      log.error('Kunde inte spara miljövariabel (Could not save environment variable)', e);
    }
  };

  /**
   * Swedish error messages mapping
   */
  const errorMessages = {
    MISSING_API_KEY: 'API-nyckel saknas. Vänligen konfigurera GEMINI_API_KEY.',
    INVALID_API_KEY: 'Ogiltig API-nyckel. Kontrollera din konfiguration.',
    NETWORK_ERROR: 'Nätverksfel uppstod. Försök igen senare.',
    API_ERROR: 'API-fel uppstod. Se konsolen för detaljer.',
    RATE_LIMIT: 'För många förfrågningar. Vänligen vänta en stund.',
    TIMEOUT: 'Förfrågan tog för lång tid. Försök igen.',
    INVALID_RESPONSE: 'Ogiltigt svar från API:t.',
    GENERAL_ERROR: 'Ett fel uppstod. Försök igen senare.'
  };

  /**
   * Get Swedish error message
   * @param {string} errorCode - Error code
   * @returns {string} Swedish error message
   */
  const getErrorMessage = (errorCode) => {
    return errorMessages[errorCode] || errorMessages.GENERAL_ERROR;
  };

  /**
   * Display user notification in Swedish
   * @param {string} message - Message to display
   * @param {string} type - Notification type (success, error, warning, info)
   */
  const showNotification = (message, type = 'info') => {
    const notificationArea = document.getElementById('notification-area');
    if (!notificationArea) {
      log.warn('Notifieringsområde saknas (Notification area missing)');
      return;
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');

    notificationArea.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  };

  /**
   * Format timestamp to Swedish locale
   * @param {Date} date - Date object
   * @returns {string} Formatted date string
   */
  const formatTimestamp = (date = new Date()) => {
    return date.toLocaleString('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  /**
   * Sanitize user input to prevent XSS
   * @param {string} input - User input
   * @returns {string} Sanitized input
   */
  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  /**
   * Debounce function for rate limiting
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  /**
   * Deep clone object
   * @param {Object} obj - Object to clone
   * @returns {Object} Cloned object
   */
  const deepClone = (obj) => {
    try {
      return JSON.parse(JSON.stringify(obj));
    } catch (e) {
      log.error('Kunde inte klona objekt (Could not clone object)', e);
      return obj;
    }
  };

  // Public API
  return {
    log,
    isSecureContext,
    getEnvVar,
    setEnvVar,
    getErrorMessage,
    showNotification,
    formatTimestamp,
    sanitizeInput,
    debounce,
    deepClone
  };
})();
