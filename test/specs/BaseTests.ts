import * as fs from 'fs';
import type { Browser } from '@playwright/test';
import { test as base, chromium, expect, Page } from '@playwright/test';
import BasePage from '../model/pages/BasePage';
import getPort from 'get-port';

export const test = base.extend<{ captureMetadata: void; open: Open }>({
  // Writes a file containing test metadata
  captureMetadata: [
    async ({ browser, browserName }, use) => {
      await fs.promises.writeFile(
        'metadata.json',
        JSON.stringify({
          browserName: browserName,
          browswerVersion: browser.version(),
        }),
        { encoding: 'utf8', flag: 'w' }
      );

      await use();
    },
    { auto: true },
  ],

  // When 'open' is called, baseUrl page will be opened
  // and a new Page object will be returned
  open: async ({ page, context, baseURL }, use) => {
    await context.clearCookies();
    await page.goto(baseURL!);

    await use(openFactory(page));
  },
});

export const lighthouseTest = base.extend<
  {},
  { port: number; browser: Browser }
>({
  port: [
    async ({}, use) => {
      const port = await getPort();
      await use(port);
    },
    { scope: 'worker' },
  ],

  browser: [
    async ({ port }, use) => {
      const browser = await chromium.launch({
        args: [`--remote-debugging-port=${port}`],
        headless: true
      });
      await use(browser);
    },
    { scope: 'worker' },
  ],
});

export type Open = <T extends BasePage>(type: {
  new (page: Page): T;
}) => Promise<T>;

export const openFactory =
  (page: Page) =>
  async <T extends BasePage>(type: { new (page: Page): T }): Promise<T> =>
    await new type(page).init();

export { expect };
