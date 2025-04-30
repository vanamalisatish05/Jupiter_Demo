import { HomePage } from '@pages';
import { test, expect } from './BaseTests.js';

test('validate product price [fluent example]', async ({open}) => {
    const price = await open(HomePage)
        .then(_=>_.clickShopMenu())
        .then(_=>_.getProduct(async p => (await p.getTitle())==='Stuffed Frog'))
        .then(_=>_.getPrice());
    expect(price).toBeCloseTo(10.99);
});

test('validate product price [stepped example]', async ({open}) => {
    const homePage = await open(HomePage);
    const shopPage = await homePage.clickShopMenu();
    const product = await shopPage.getProduct(async p => (await p.getTitle())==='Stuffed Frog');
    const price = await product.getPrice();
    expect(price).toBeCloseTo(10.99);
});

test('validate product cart count [fluent example]', async ({open}) => {
    const count = await open(HomePage)
        .then(_=>_.clickShopMenu())
        .then(_=>_.getProduct(async p => (await p.getTitle())==='Stuffed Frog'))
        .then(_=>_.clickBuyButton(3))
        .then(_=>_.getCartCount());
    expect(count).toBe(3);
});