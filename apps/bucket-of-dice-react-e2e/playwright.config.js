"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("@playwright/test");
var preset_1 = require("@nx/playwright/preset");
var devkit_1 = require("@nx/devkit");
// For CI, you may want to set BASE_URL to the deployed application.
var baseURL = process.env['BASE_URL'] || 'http://localhost:4200';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */
exports.default = (0, test_1.defineConfig)(__assign(__assign({}, (0, preset_1.nxE2EPreset)(__filename, { testDir: './src' })), { 
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        baseURL: baseURL,
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    }, 
    /* Run your local dev server before starting the tests */
    webServer: {
        command: 'npx nx run bucket-of-dice-react:preview',
        url: 'http://localhost:4200',
        reuseExistingServer: true,
        cwd: devkit_1.workspaceRoot,
    }, projects: [
        {
            name: 'chromium',
            use: __assign({}, test_1.devices['Desktop Chrome']),
        },
        {
            name: 'firefox',
            use: __assign({}, test_1.devices['Desktop Firefox']),
        },
        {
            name: 'webkit',
            use: __assign({}, test_1.devices['Desktop Safari']),
        },
        // Uncomment for mobile browsers support
        /* {
          name: 'Mobile Chrome',
          use: { ...devices['Pixel 5'] },
        },
        {
          name: 'Mobile Safari',
          use: { ...devices['iPhone 12'] },
        }, */
        // Uncomment for branded browsers
        /* {
          name: 'Microsoft Edge',
          use: { ...devices['Desktop Edge'], channel: 'msedge' },
        },
        {
          name: 'Google Chrome',
          use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        } */
    ] }));
