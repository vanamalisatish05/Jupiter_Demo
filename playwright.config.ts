// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [ ['junit', { outputFile: 'tests_output/results.xml' }] ],
};
export default config;