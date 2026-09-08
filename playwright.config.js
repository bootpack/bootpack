const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './test/browser',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  use: { browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: [
    { command: 'node tools/preview.js', url: 'http://127.0.0.1:4173', reuseExistingServer: false },
    { command: 'node tools/preview.js --port 4174 --base /bootpack/', url: 'http://127.0.0.1:4174/bootpack/', reuseExistingServer: false }
  ],
  projects: [
    { name: 'desktop', use: { baseURL: 'http://127.0.0.1:4173/', viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { baseURL: 'http://127.0.0.1:4173/', viewport: { width: 390, height: 844 } } },
    { name: 'subpath-desktop', use: { baseURL: 'http://127.0.0.1:4174/bootpack/', viewport: { width: 1440, height: 1000 } } },
    { name: 'subpath-mobile', use: { baseURL: 'http://127.0.0.1:4174/bootpack/', viewport: { width: 390, height: 844 } } }
  ]
});
