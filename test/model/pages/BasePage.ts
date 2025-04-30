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
        await this.page.locator('#menu-contact').click();
        return await new ContactPage(this.page).init();
    }

    async clickShopMenu(): Promise<ShopPage> {
        await this.page.locator('#menu-shop').click();
        return await new ShopPage(this.page).init();
    }

    async clickCartMenu(): Promise<CartPage> {
        await this.page.locator('#menu-cart').click();
        return await new CartPage(this.page).init();
    }

    async clickLoginMenu(): Promise<LoginDialog<this>> {
        await this.page.locator('#menu-login').click();
        const root = this.page.locator('#login-modal');
        return new LoginDialog(root, this);
    }

    async clickLogoutMenu(): Promise<LogoutDialog> {
        await this.page.locator('#menu-logout').click();
        const root = this.page.locator('#logout-modal');
        return new LogoutDialog(root);
    }

    async getUser(): Promise<string> {
        return await this.page.locator('#login-greeting').innerText();
    }

    async getCartCount(): Promise<number> {
        return Number.parseInt(await this.page.locator('#cart-count').innerText());
    }
}
