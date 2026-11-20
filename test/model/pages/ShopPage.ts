
import { Product } from '@components';
import BasePage from './BasePage.ts';

export default class ShopPage extends BasePage {
    async init(): Promise<this> {
        await this.page.waitForURL(/#\/shop/);
        await this.page.locator('.product').first().waitFor({ state: 'visible' });
        return this;
    }

    async getProduct(comparison: (p: Product) => Promise<boolean>): Promise<Product> {
        const count = await this.page.locator('.product').count();
        for (const i of Array.from({length: count}).keys()) {
            const rootElement = this.page.locator('.product').nth(i);
            const product = new Product(rootElement, this);
            if (await comparison(product)) return product;
        }  
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Product with comparison ${comparison} not found`);
    }    
}
