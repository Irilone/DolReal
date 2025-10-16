/**
 * Initialization Module
 * Bootstraps all modules and starts the application
 */
(function(window) {
  'use strict';
  
  window.VaccineBusInit = (function () {
      
      function init() {
          console.log('Initializing Vaccine Bus Schedule System...');
          
          // Check if all required modules are loaded
          if (!window.MapUpdater) {
              console.error('MapUpdater module not loaded');
              return;
          }
          
          if (!window.ScheduleCarousel) {
              console.error('ScheduleCarousel module not loaded');
              return;
          }
          
          if (!window.OtherScripts) {
              console.error('OtherScripts module not loaded');
              return;
          }
          
          // Initialize other scripts first (styles, JSON-LD)
          window.OtherScripts.initializeOtherScripts();
          
          // Initialize MapUpdater (loads external schedule data)
          window.MapUpdater.initialize();
          
          // Wait for schedule to load, then update daily map
          window.MapUpdater.waitForSchedule().then(() => {
              window.MapUpdater.updateDailyMap();
          });
          
          // Setup automatic daily updates
          window.MapUpdater.setupDailyUpdate();
          
          // Initialize schedule carousel
          window.ScheduleCarousel.init();
          
          console.log('Vaccine Bus Schedule System initialized successfully');
      }
      
      // Auto-initialize when DOM is ready
      if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', init);
      } else {
          // DOM is already loaded
          init();
      }
      
      return {
          init: init
      };
  })();
})(window);