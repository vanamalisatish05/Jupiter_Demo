import { Page } from '@playwright/test';
import { ContactPage, ShopPage, CartPage } from '@pages';
import { LoginDialog, LogoutDialog } from '@components';



export default abstract class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    abstract init(): Promise<this>;

    async clickContactMenu(): Promise<ContactPage> {
        await this.page.locator('#nav-contact a').click();
        return await new ContactPage(this.page).init();
    }

    async clickShopMenu(): Promise<ShopPage> {
        await this.page.locator('#nav-shop a').click();
        return await new ShopPage(this.page).init();
    }

    async clickCartMenu(): Promise<CartPage> {
        await this.page.locator('#nav-cart a').click();
        return await new CartPage(this.page).init();
    }

    async clickLoginMenu(): Promise<LoginDialog<this>> {
        await this.page.locator('#nav-login a').click();
        const root = this.page.locator('.popup.modal');
        await root.waitFor({ state: 'visible' });
        return new LoginDialog(root, this);
    }

    async clickLogoutMenu(): Promise<LogoutDialog> {
        await this.page.locator('#nav-logout a').click();
        const root = this.page.locator('.popup.modal');
        await root.waitFor({ state: 'visible' });
        return new LogoutDialog(root);
    }

    async getUser(): Promise<string> {
        return await this.page.locator('#nav-user .user').innerText();
    }

    async getCartCount(): Promise<number> {
        return Number.parseInt(await this.page.locator('#nav-cart .cart-count').innerText());
    }
}
