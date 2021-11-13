// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [['line'],['junit', { outputFile: 'tests_output/results.xml' }]],
};
export default config;