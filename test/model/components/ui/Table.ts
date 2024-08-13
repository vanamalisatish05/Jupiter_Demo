import { Locator } from "playwright-core";

export default class Table {
    private rootElement: Locator;

    constructor(rootElement: Locator) {
        this.rootElement = rootElement;
    }

    private async getColumnIndex(column: string): Promise<number> {
        const handle = await this.rootElement.elementHandle();
        const columnElementsPromises = (await handle!.$$('thead th')).map(element => element.innerText());
        const columnElements = await Promise.all(columnElementsPromises);
        return columnElements.findIndex(entry => entry===column);
    }

    async getValue(searchColumn: string, searchValue: string, returnColumn: string): Promise<Locator> {
        const searchColumnIndex = await this.getColumnIndex(searchColumn);
        const returnColumnIndex = await this.getColumnIndex(returnColumn);
        const count = await this.rootElement.locator('tbody tr').count();
        for (const i of Array.from({length: count}).keys()) {
            const row = this.rootElement.locator('tbody tr').nth(i);
            const cellText = await row.locator('td,th').nth(searchColumnIndex).innerText();
            if(cellText.trim()===searchValue) {
                return row.locator('td,th').nth(returnColumnIndex);
            }
        }
        throw new Error(`Couldn't find element for searchColumn: ${searchColumn}, searchValue: ${searchValue}, returnColumn: ${returnColumn}`);
    }
}
