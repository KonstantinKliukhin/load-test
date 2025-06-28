import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    headless: false,
  },
  reporter: [["@artilleryio/playwright-reporter", { name: "My Test Suite" }]],
});
