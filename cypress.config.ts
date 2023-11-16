import { defineConfig } from "cypress";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import cypressSplit from "cypress-split";

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/results",
    reportFilename: "[name]",
    html: true,
    json: false,
    embeddedScreenshots: true,
    reportPageTitle: "Cypress Test Report",
    inlineAssets: true,
    code: true,
  },
  e2e: {
    experimentalRunAllSpecs: true,
    video: false,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",

    setupNodeEvents(cypressOn, config) {
      const on = require("cypress-on-fix")(cypressOn);
      require("@cypress/grep/src/plugin")(config);
      require("cypress-mochawesome-reporter/plugin")(on);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [
            polyfillNode({
              polyfills: {
                crypto: true,
                stream: true,
                path: true,
              },
              globals: {
                buffer: true,
                global: true,
              },
            }),
          ],
        })
      );
      cypressSplit(on, config);
      return config;
    },
  },
});
