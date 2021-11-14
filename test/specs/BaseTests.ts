import {test as base , Page} from '@playwright/test';
import BasePage from '../model/pages/BasePage';
import * as dotenv from 'dotenv';

base.beforeAll(async () => {
    dotenv.config();
});

export default base.beforeEach(async ({ page, context }) => {
    checkMandatoryEnvironmentVariables();
    const {PLAYWRIGHT_URL} = readEnvironmentVariables();
    // Go to the starting url before each test.
    await context.clearCookies();
    await page.goto(PLAYWRIGHT_URL); 
}); 

module.exports.afterEach = base.afterEach(async ({page, context}, testInfo)=>{
    if(testInfo.error) {
        await page.screenshot({path: testInfo.outputPath('screenshot.png'),fullPage: true});
    }
}); 


function checkMandatoryEnvironmentVariables() {
    const missing: {areMissing: boolean, list: string[]} = {areMissing: false, list: []};
    if (process.env.PLAYWRIGHT_URL === undefined || process.env.PLAYWRIGHT_URL.length===0) {
        missing.areMissing = true;
        missing.list.push('PLAYWRIGHT_URL');
    }
    if (missing.areMissing===true) throw Error(`Missing mandatory environment variables: ${missing.list}`);
}

function readEnvironmentVariables() {
    const PLAYWRIGHT_URL = process.env.PLAYWRIGHT_URL;
    return {PLAYWRIGHT_URL};
}

export type Open = <T extends BasePage> (type: { new(page: Page): T; }) => Promise<T>;

export const openFactory = (page:Page) => 
    async <T extends BasePage> (type: { new(page: Page): T; }): Promise<T> => 
        await (new type(page)).init();

