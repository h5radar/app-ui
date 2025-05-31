import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: true,
    html: true,
    json: true,
  },
  e2e: {
    excludeSpecPattern: ["**/2-advanced-examples/**"],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
