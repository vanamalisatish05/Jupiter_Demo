// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [['list'],['junit', { outputFile: 'test-results/results.xml' }]],
};
export default config;