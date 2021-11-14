import { test, expect, Page, TestFixture } from '@playwright/test';
import { ContactData } from '../model/data';
import { HomePage } from '../model/pages';
import beforeEach, { Open, openFactory } from './BaseTests';
import afterEach from './BaseTests';
import { APIContactDataProvider, ContactDataProvider } from './dataProviders';
import { TestAPIContactData } from './dataProviders/APIContactDataProvider';

let open: Open;
test.beforeEach(async ({ page }) => {
    beforeEach;
    open = openFactory(page);
});
test.afterEach(async ()=>{
    afterEach;
});

test('validate mandatory errors [fluent example]', async () => {
    const contactPage = await open(HomePage)
        .then(_=>_.clickContactMenu())
        .then(_=>_.clickSubmitButton());

    expect(await contactPage.getForenameError()).toBe('Forename is required');
    expect(await contactPage.getEmailError()).toBe('Email is required');
    expect(await contactPage.getMessageError()).toBe('Message is required');
});

test('validate mandatory errors [stepped example]', async () => {
    const homePage = await open(HomePage);
    const contactPage = await homePage.clickContactMenu();
    await contactPage.clickSubmitButton();

    expect(await contactPage.getForenameError()).toBe('Forename is required');
    expect(await contactPage.getEmailError()).toBe('Email is required');
    expect(await contactPage.getMessageError()).toBe('Message is required');
});

test('validate mandatory errors can be fixed [fluent example]', async ()=> {
    const contactPage = await open(HomePage)
        .then(_=>_.clickContactMenu())
        .then(_=>_.clickSubmitButton())
        .then(_=>_.setForename('Juan'))
        .then(_=>_.setEmail('jflorez@planittesting.com'))
        .then(_=>_.setMessage('Hello'));

    expect(await contactPage.getForenameError()).toBe('');
    expect(await contactPage.getEmailError()).toBe('');
    expect(await contactPage.getMessageError()).toBe('');
});

test('validate mandatory errors can be fixed [stepped example]', async ()=> {
    const homePage = await open(HomePage);
    const contactPage = await homePage.clickContactMenu();
    await contactPage.clickSubmitButton();
    await contactPage.setForename('Juan');
    await contactPage.setEmail('jflorez@planittesting.com');
    await contactPage.setMessage('Hello');

    expect(await contactPage.getForenameError()).toBe('');
    expect(await contactPage.getEmailError()).toBe('');
    expect(await contactPage.getMessageError()).toBe('');
});

test('validate successful submittion [fluent example]', async ()=> {
    const contactPage = await open(HomePage)
        .then(_=>_.clickContactMenu())
        .then(_=>_.setForename('Juan'))
        .then(_=>_.setEmail('jflorez@planittesting.com'))
        .then(_=>_.setMessage('Hello'))
        .then(_=>_.clickSubmitButton());

    expect(await contactPage.getSuccessMessage()).toBe('Thanks Juan, we appreciate your feedback.');
});

test('validate successful submittion [stepped example]', async ()=> {
    const homePage = await open(HomePage);
    const contactPage = await homePage.clickContactMenu();
    await contactPage.setForename('Juan');
    await contactPage.setEmail('jflorez@planittesting.com');
    await contactPage.setMessage('Hello');
    await contactPage.clickSubmitButton();

    expect(await contactPage.getSuccessMessage()).toBe('Thanks Juan, we appreciate your feedback.');
});

/**
 * API data provider example. 
 * This shows how to deal with async data providers.
 * With this approach it is not possible to generate tests from a data array
 * Data sourced this way will be passed directly to one test as a parameter
 */
const parameterizedTestAPI = test.extend<TestAPIContactData>({
    apiContactData: async ({ }, use) => {
        const data: ContactData = await new APIContactDataProvider().getData();
        await use(data);
    }
});

parameterizedTestAPI('validate successful submittion [api data driven example]', async ({ apiContactData: data }) => {
    const homePage = await open(HomePage);
    const contactPage = await homePage.clickContactMenu();
    await contactPage.clickContactMenu();
    await contactPage.setContactData(data);
    await contactPage.clickSubmitButton();

    expect(await contactPage.getSuccessMessage())
        .toBe(`Thanks ${data.forename}, we appreciate your feedback.`);
});

/**
 * This example uses a sync data provider.
 * Here a data array is obtained and tests are dynamically generated for each entry in the array
 * TODO: Find a way to dynamically generate tests based on an async data provider
 */
const contactData = new ContactDataProvider('specs/data/contact_data.json').getData();
contactData.forEach(data => {
    test(`validate successful submittion [json data driven example] - ${data.forename}`, async () => {
        const homePage = await open(HomePage);
        const contactPage = await homePage.clickContactMenu();
        await contactPage.clickContactMenu();
        await contactPage.setContactData(data);
        await contactPage.clickSubmitButton();
    
        expect(await contactPage.getSuccessMessage())
            .toBe(`Thanks ${data.forename}, we appreciate your feedback.`);
    });
});
