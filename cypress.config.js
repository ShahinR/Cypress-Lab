const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  nodeVersion: 'system',
  env: {
    fo: 'https://www.demoblaze.com',
    custom_firstname: 'Bob',
    custom_lastname: 'Dylan',
    customer_cc_number: '4000000000000002',
    custom_password: 'test@TEST2021',
    custom_country: 'France',
    custom_city: 'Lyon',
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'https://www.demoblaze.com',
    experimentalInteractiveRunEvents: true,
  },
})
