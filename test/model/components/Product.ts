import { ShopPage } from '@pages';
import { Locator } from 'playwright-core';

export default class Product {
    private rootElement: Locator;
    private parent: ShopPage;
    
    constructor(rootElement: Locator, parent: ShopPage) {
        this.rootElement = rootElement;
        this.parent = parent;
    }

    async getTitle(): Promise<string> {
        return this.rootElement.locator('.product-title').innerText();
    }

    async getPrice(): Promise<number> {
        return Number((await this.rootElement.locator('.product-price')
            .innerText())
            .replace(new RegExp('[^0-9\\.]+'), ''));
    }

    async clickBuyButton(times = 1): Promise<ShopPage> {
        await this.rootElement.locator('.btn-success').click({clickCount: times});
        return this.parent;
    }
}
