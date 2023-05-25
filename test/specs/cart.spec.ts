import { HomePage } from '@pages';
import { test, expect} from './BaseTests'; 

test('validate cart price [fluent example]', async ({open}) => {
    const product = await open(HomePage)
        .then(_=>_.clickShopMenu())
        .then(_=>_.getProduct(async p => await p.getTitle()==='Stuffed Frog'));
    const price = await product.getPrice();
    const cartPrice = await product.clickBuyButton(5)
        .then(_=>_.clickCartMenu())
        .then(_=>_.getPrice('Stuffed Frog'));
    expect(price).toBeCloseTo(cartPrice);
});

test('validate cart price [stepped example]', async ({open}) => {
    const homePage = await open(HomePage);
    const shopPage = await homePage.clickShopMenu();
    const product = await shopPage.getProduct(async p => await p.getTitle()==='Stuffed Frog');
    const price = await product.getPrice();
    await product.clickBuyButton(5);
    const cartPage = await shopPage.clickCartMenu();
    const cartPrice = await cartPage.getPrice('Stuffed Frog');
    expect(price).toBeCloseTo(cartPrice);
});

test('validate cart subtotals [fluent example]', async ({open}) => {
    const cartPage = await open(HomePage)
        .then(_=>_.clickShopMenu())
        .then(_=>_.getProduct(async p => await p.getTitle()==='Stuffed Frog'))
        .then(_=>_.clickBuyButton(5))
        .then(_=>_.clickCartMenu());
    const price = await cartPage.getPrice('Stuffed Frog');
    const quantity = await cartPage.getQuantity('Stuffed Frog');
    const subtotal = await cartPage.getSubtotal('Stuffed Frog');
    expect(price*quantity).toBeCloseTo(subtotal);
});

test('validate cart subtotals [stepped example]', async ({open}) => {
    const homePage = await open(HomePage);
    const shopPage = await homePage.clickShopMenu();
    const product = await shopPage.getProduct(async p => await p.getTitle()==='Stuffed Frog');
    await product.clickBuyButton(5);
    const cartPage = await shopPage.clickCartMenu();
    const price = await cartPage.getPrice('Stuffed Frog');
    const quantity = await cartPage.getQuantity('Stuffed Frog');
    const subtotal = await cartPage.getSubtotal('Stuffed Frog');
    expect(price*quantity).toBeCloseTo(subtotal);
});