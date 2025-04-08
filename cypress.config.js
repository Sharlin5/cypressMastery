// npx cypress run --record --key c6cea708-0bee-4c1e-8599-3cae4d43cb1e
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "96srdf",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
