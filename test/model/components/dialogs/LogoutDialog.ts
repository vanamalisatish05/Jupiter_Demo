import { HomePage } from '@pages';
import { Locator } from 'playwright-core';

export default class LogoutDialog {
    private rootElement: Locator;

    constructor(rootElement: Locator) {
        this.rootElement = rootElement;
    }

    async clickLogoutButton(): Promise<HomePage> {
        await this.rootElement.getByRole('link', { name: 'Logout' }).click();
        const handle = await this.rootElement.elementHandle();
        if (!handle) throw new Error('Logout dialog root element is not available');

        const frame = await handle.ownerFrame();
        if (!frame) throw new Error('Unable to resolve frame for logout dialog');

        const page = frame.page();
        return await new HomePage(page).init();
    }
}
