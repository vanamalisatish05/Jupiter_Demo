import { test, expect, Page } from '@playwright/test';
import { LoginData } from '../model/data';
import { HomePage } from '../model/pages';
import beforeEach, { Open, openFactory } from './BaseTests'; 

let open: Open;
test.beforeEach(async ({ page }) => {
    beforeEach;
    open = openFactory(page);
});

test('validate successful login [fluent example]', async () => {
    const user = await open(HomePage)
        .then(_=>_.clickShopMenu())
        .then(_=>_.clickLoginMenu())
        .then(_=>_.setUsername('someone'))
        .then(_=>_.setPassword('letmein'))
        .then(_=>_.clickAgreeCheckBox())
        .then(_=>_.clickLoginButton())
        .then(_=>_.getUser());
    expect(user).toBe('someone');
});

test('validate successful login [stepped example]', async () => {
    const homePage = await open(HomePage);
    const loginDialog = await homePage.clickLoginMenu();
    await loginDialog.setUsername('someone');
    await loginDialog.setPassword('letmein');
    await loginDialog.clickAgreeCheckBox();
    await loginDialog.clickLoginButton();
    const user = await homePage.getUser();
    expect(user).toBe('someone');
});

test.describe('data driven login tests', () => {
    const dataset: LoginData[] = [
        {username: 'someone', password: 'letmein'},
        {username: 'someoneelse', password: 'letmein'}]; 
    dataset.forEach(data => {
        test(`validate successful logout [fluent example] - ${data.username}`, async () => {
            const user = await open(HomePage)
                .then(_=>_.clickLoginMenu())
                .then(_=>_.login(data))
                .then(_=>_.clickLogoutMenu())
                .then(_=>_.clickLogoutButton())
                .then(_=>_.getUser());
            expect(user).toBe('');
        });
        test(`validate successful logout [stepped example] - ${data.username}`, async () => {
            const homePage = await open(HomePage);
            const loginDialog = await homePage.clickLoginMenu();
            await loginDialog.login(data);
            const logoutDialog = await homePage.clickLogoutMenu();
            await logoutDialog.clickLogoutButton();
            const user = await homePage.getUser();
            expect(user).toBe('');
        });
    });
});
