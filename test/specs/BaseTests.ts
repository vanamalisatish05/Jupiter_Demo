import {test as base , Page} from '@playwright/test';
import BasePage from '../model/pages/BasePage';

export default base.beforeEach(async ({ page, context, baseURL }) => {
    
    // Go to the starting url before each test.
    await context.clearCookies();
    await page.goto(baseURL); 
}); 

export type Open = <T extends BasePage> (type: { new(page: Page): T; }) => Promise<T>;

export const openFactory = (page:Page) => 
    async <T extends BasePage> (type: { new(page: Page): T; }): Promise<T> => 
        await (new type(page)).init();

