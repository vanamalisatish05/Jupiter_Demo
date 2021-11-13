import { test, expect, Page } from '@playwright/test';
import { ContactData } from '../model/data';
import { HomePage } from '../model/pages';
import BasePage from '../model/pages/BasePage';
import beforeEach, { Open, openFactory } from './BaseTests'; 
import { APIContactDataProvider, ContactDataProvider } from './dataProviders';

let open: Open;
test.beforeEach(async ({ page }) => {
    beforeEach;
    open = openFactory(page);
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

type TestFixtures = {  jsonData: ContactData[];  apiData: ContactData;};
const parameterizedTest = test.extend<TestFixtures>({
    jsonData: async ({},use) => {
        const data = await new ContactDataProvider('specs/data/contact_data.json').getData();
        use(data);
    },
    apiData: async ({},use) => {
        const data = await new APIContactDataProvider().getData();
        await use(data);
    }
});

// TODO how to iterate over the json data array to run the test as many time as entries in the array?
parameterizedTest(`validate successful submittion [data driven example] ${new Date()}`, async ({jsonData})=>{
    const homePage = await open(HomePage);
    const contactPage = await homePage.clickContactMenu();
    await contactPage.clickContactMenu();
    await contactPage.setContactData(jsonData[0]);
    await contactPage.clickSubmitButton();

    expect(await contactPage.getSuccessMessage())
        .toBe(`Thanks ${jsonData[0].forename}, we appreciate your feedback.`);
});

parameterizedTest('validate successful submittion [data driven example]', async ({apiData})=>{
    const homePage = await open(HomePage);
    const contactPage = await homePage.clickContactMenu();
    await contactPage.clickContactMenu();
    await contactPage.setContactData(apiData);
    await contactPage.clickSubmitButton();

    expect(await contactPage.getSuccessMessage())
        .toBe(`Thanks ${apiData.forename}, we appreciate your feedback.`);
});