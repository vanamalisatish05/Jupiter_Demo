import { Table } from '../components';
import BasePage from './BasePage';

export default class CartPage extends BasePage {
    // eslint-disable-next-line @typescript-eslint/require-await
    async init(): Promise<this> {
        return this;
    }

    private async getTable() {
        return new Table(this.page.locator('.cart-items'));
    }

    async getPrice(title: string): Promise<number> {
        const element = await (await this.getTable()).getValue('Item', title, 'Price');
        const priceString = await element.innerText();
        return Number.parseFloat(
            priceString.replace(new RegExp('[^0-9\\.]+'), '')
        );
    }

    async getQuantity(title: string) {
        const element = await (await this.getTable()).getValue('Item', title, 'Quantity');
        const priceString = await element.locator('input').getAttribute('value');
        return Number.parseInt(
            priceString
        );
    }

    async getSubtotal(title: string) {
        const element = await (await this.getTable()).getValue('Item', title, 'Subtotal');
        const priceString = await element.innerText();
        return Number.parseFloat(
            priceString.replace(new RegExp('[^0-9\\.]+'), '')
        );
    }
}
