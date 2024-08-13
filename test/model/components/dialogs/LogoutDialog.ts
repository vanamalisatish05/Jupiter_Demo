import { Locator } from 'playwright-core';
import {HomePage} from '@pages';

export default class LogoutDialog {
    private rootElement: Locator;

    constructor(rootElement: Locator) {
        this.rootElement = rootElement;
    }

    async clickLogoutButton(): Promise<HomePage> {
        await this.rootElement.locator('.btn-success').click();
        const page = (await(await this.rootElement.elementHandle())!.ownerFrame())!.page();
        return await new HomePage(page).init();
    }
}
