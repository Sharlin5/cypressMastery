// npx cypress run --record --key c6cea708-0bee-4c1e-8599-3cae4d43cb1e
const fs = require('fs');
const path = require('path');
const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  projectId: "96srdf",
  experimentalStudio: true,
  viewportHeight: 1080,
  viewportWidth: 1920,
  retries: 3,
  defaultCommandTimeout: 60000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  env: {
    projectName: process.env.PROJECT_NAME || "Cypress Test Automation",
    environment: process.env.ENVIRONMENT || "QA",
    API_KEY: process.env.API_KEY,
    API_BASE_URL: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
  },
  e2e: {
    baseUrl: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:run', async (details) => {
        console.log('override before:run');
        console.log('Running tests');
        await beforeRunHook(details);
      });
      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
    },
  },
});
