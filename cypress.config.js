// npx cypress run --record --key c6cea708-0bee-4c1e-8599-3cae4d43cb1e
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "96srdf",
  experimentalStudio: true,
  viewportHeight: 1080,
  viewportWidth: 1920,
  defaultCommandTimeout: 60000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
