import { test as base, expect, Page } from '@playwright/test';
import fs from 'fs';
import BasePage from '../model/pages/BasePage';

export const test = base.extend<{ captureMetadata: void, open: Open }>({
  // Writes a file containing test metadata
  captureMetadata: [
    async ({ browser, browserName }, use, ) => {
      await fs.promises.writeFile(
        'metadata.json',
        JSON.stringify({
          browserName: browserName,
          browswerVersion: browser.version(),
        }),
        { encoding: 'utf8', flag: 'w'}
      )

      await use();
    },
    { auto: true }
  ],

  // When 'open' is called, baseUrl page will be opened
  // and a new Page object will be returned
  open: async ({ page, context, baseURL }, use) => {
    await context.clearCookies();
    await page.goto(baseURL!);

    await use(openFactory(page));
  }
});

export type Open = <T extends BasePage>(type: {
  new (page: Page): T;
}) => Promise<T>;

export const openFactory =
  (page: Page) =>
  async <T extends BasePage>(type: { new (page: Page): T }): Promise<T> =>
    await new type(page).init();

export { expect };
