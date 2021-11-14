import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../model/pages';
import afterEach from './BaseTests';
import beforeEach, { Open, openFactory } from './BaseTests'; 

let open: Open;
test.beforeEach(async ({ page }) => {
    beforeEach;
    open = openFactory(page);
});
test.afterEach(async ()=>{
    afterEach;
});

test('validate product price [fluent example]', async () => {
    const price = await open(HomePage)
        .then(_=>_.clickShopMenu())
        .then(_=>_.getProduct(async p => (await p.getTitle())==='Stuffed Frog'))
        .then(_=>_.getPrice());
    expect(price).toBeCloseTo(10.99);
});

test('validate product cart count [fluent example]', async () => {
    const count = await open(HomePage)
        .then(_=>_.clickShopMenu())
        .then(_=>_.getProduct(async p => (await p.getTitle())==='Stuffed Frog'))
        .then(_=>_.clickBuyButton(3))
        .then(_=>_.getCartCount());
    expect(count).toBe(3);
});