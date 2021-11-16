import { Locator } from 'playwright-core';
import {LoginData} from '../../data';

export default class LoginDialog<T> {
    private rootElement: Locator;
    private parent: T;

    constructor(rootElement: Locator, parent: T) {
        this.rootElement = rootElement;
        this.parent = parent;
    }

    async clickLoginButton(): Promise<T> {
        await this.rootElement.locator('.btn-primary').click();
        return this.parent;
    }

    async clickAgreeCheckBox(): Promise<LoginDialog<T>> {
        await this.rootElement.locator('#agree').click();
        return this;
    }

    async setPassword(password: string): Promise<LoginDialog<T>> {
        await this.rootElement.locator('#loginPassword').fill(password);
        return this;
    }

    async setUsername(username: string): Promise<LoginDialog<T>> {
        await this.rootElement.locator('#loginUserName').fill(username);
        return this;
    }

    async login(loginData: LoginData): Promise<T> {
        await this.setUsername(loginData.username);
        await this.setPassword(loginData.password);
        await this.clickAgreeCheckBox();
        return await this.clickLoginButton();
    }
}

