import { HomePage } from '@pages';
import { Locator } from 'playwright-core';

export default class LogoutDialog {
    private rootElement: Locator;

    constructor(rootElement: Locator) {
        this.rootElement = rootElement;
    }

    async clickLogoutButton(): Promise<HomePage> {
        await this.rootElement.locator('[id="modal-yes-button"]').click();
        const page = (await(await this.rootElement.elementHandle())!.ownerFrame())!.page();
        return await new HomePage(page).init();
    }
}
