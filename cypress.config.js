/**
 * @author      <shahin@codequality.fr>
 * @copyright   Copyright (c) codequality.fr
 * @license     Proprietary
 */

const { defineConfig } = require('cypress');
const path = require('path');

module.exports = defineConfig({
  chromeWebSecurity: false,
  chromiumWebSecurity: false,
  retryOnNetworkFailure: true,
  followRedirect: true,
  failOnStatusCode: false,
  chromeWebSecurityDisableHardwareAcceleration: true,
  defaultCommandTimeout: 10000,
  responseTimeout: 30000,
  pageLoadTimeout: 100000,
  taskTimeout: 120000,
  execTimeout: 60000,
  requestTimeout: 30000,
  viewportHeight: 1024,
  viewportWidth: 1280,
  video: true,
  videoCompression: true,
  videosFolder: "results/videos",
  screenshotsFolder: "results/screenshots",
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true,
    charts: true,
    reportPageTitle: "Cypress Nuxt Front : Report",
    inlineAssets: true,
  },
  env: {
    userEmail: 'qa.shadow.tester@gmail.com',
  },
  e2e: {
    setupNodeEvents(on, config) {
      process.env.CYPRESS_NO_COMMAND_LOG = 1;

      const extensionPath = path.resolve(
        '/Users/srastgar/Library/Application Support/Google/Chrome/Default/Extensions/ldggnhcfajoadamikfgcmalkgmphokcb/1.4.30_0'
      );

      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (["chromium", "chrome"].includes(browser.name)) {
          if (!browser.isHeadless) {
            // Load Mendo GPT extension in non-headless mode
            launchOptions.args.push(`--disable-extensions-except=${extensionPath}`);
            launchOptions.args.push(`--load-extension=${extensionPath}`);
          } else {
            // Standard headless tweaks
            launchOptions.args.push("--no-sandbox");
            launchOptions.args.push("--disable-gpu");
            launchOptions.args.push("--disable-software-rasterizer");
            launchOptions.args.push("--disable-dev-shm-usage");
            launchOptions.args.push("--js-flags=--max-old-space-size=10240");
            launchOptions.args.push("--enable-precise-memory-info");
            launchOptions.args.push("--disable-background-timer-throttling");
            launchOptions.args.push("--disable-renderer-backgrounding");
            launchOptions.args.push("--disable-backgrounding-occluded-windows");
            launchOptions.args.push("--renderer-process-limit=1");
            launchOptions.args.push("--force-fieldtrials=*BackgroundTracing/default/");
            launchOptions.args.push("--disable-extensions");
          }
        }

        return launchOptions;
      });

      return require('./cypress/plugins/index.js')(on, config);
    },
    taskTimeout: 120000,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: 'https://app.mendo.cloud',
    experimentalInteractiveRunEvents: true,
    numTestsKeptInMemory: 0,
    experimentalMemoryManagement: true,
  }
});
