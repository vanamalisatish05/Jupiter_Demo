import { LoginData } from '@data';
import { Locator } from 'playwright-core';

export default class LoginDialog<T> {
    private rootElement: Locator;
    private parent: T;

    constructor(rootElement: Locator, parent: T) {
        this.rootElement = rootElement;
        this.parent = parent;
    }

    async clickLoginButton(): Promise<T> {
        await this.rootElement.locator('[id="modal-log-in-button"]').click();
        return this.parent;
    }

    async clickAgreeCheckBox(): Promise<LoginDialog<T>> {
        await this.rootElement.locator('#agree').click();
        return this;
    }

    async setPassword(password: string): Promise<LoginDialog<T>> {
        await this.rootElement.locator('#password').fill(password);
        return this;
    }

    async setUsername(username: string): Promise<LoginDialog<T>> {
        await this.rootElement.locator('#username').fill(username);
        return this;
    }

    async login(loginData: LoginData): Promise<T> {
        await this.setUsername(loginData.username);
        await this.setPassword(loginData.password);
        await this.clickAgreeCheckBox();
        return await this.clickLoginButton();
    }
}

