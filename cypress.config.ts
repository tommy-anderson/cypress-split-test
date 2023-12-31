import { defineConfig } from "cypress";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import cypressSplit from "cypress-split";
const { afterRunHook } = require("cypress-mochawesome-reporter/lib");

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "cypress-reporter-config.json",
  },
  e2e: {
    retries: {
      runMode: 200,
      openMode: 0,
    },
    experimentalRunAllSpecs: true,
    video: false,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    defaultCommandTimeout: 1000,

    setupNodeEvents(cypressOn, config) {
      const on = require("cypress-on-fix")(cypressOn);
      require("@cypress/grep/src/plugin")(config);
      require("cypress-mochawesome-reporter/plugin")(on);
      cypressSplit(on, config);

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

      return config;
    },
  },
});
