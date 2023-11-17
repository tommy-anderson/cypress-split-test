import { defineConfig } from "cypress";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import cypressSplit from "cypress-split";
const { afterRunHook } = require("cypress-mochawesome-reporter/lib");

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "cypress-reporter-config.json",
    html: true,
  },
  e2e: {
    experimentalRunAllSpecs: true,
    video: false,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",

    setupNodeEvents(cypressOn, config) {
      // hack to make multiple-reporters work
      const on = require("cypress-on-fix")(cypressOn);
      on("after:run", async () => {
        const path = require("path");
        const fs = require("fs");
        const sourceDir = path.join(__dirname, "cypress/reports/.jsons");
        const destDir = path.join(__dirname, "cypress/reports/html/.jsons");

        // Check if destination directory exists, and create it if it doesn't
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        const jsonFiles = fs.readdirSync(sourceDir);
        jsonFiles.forEach((jsonFile) => {
          const sourceFile = path.join(sourceDir, jsonFile);
          const destFile = path.join(destDir, jsonFile);
          // copy file
          fs.copyFileSync(sourceFile, destFile);
        });
        console.log(__dirname);
        await afterRunHook(config);
      });
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
