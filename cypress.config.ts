import { defineConfig } from "cypress";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import cypressSplit from "cypress-split";

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    videoUploadOnPasses: false,

    setupNodeEvents(on, config) {
      require("@cypress/grep/src/plugin")(config);
      on(
        "file:preprocessor",
        createBundler({
          alias: {
            "meteor/random": "meteor-random-node",
          },
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
