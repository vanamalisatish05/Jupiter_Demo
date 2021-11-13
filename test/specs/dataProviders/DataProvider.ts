/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as fs from 'fs/promises';
import * as path from 'path';

export default abstract class DataProvider<T> {
    protected dataFile: string;
    
    protected async getJsonData(): Promise<any> {
        const filePath = path.join(__dirname, `../../${this.dataFile}`);
        const value = await fs.readFile(filePath);
        return JSON.parse(value.toString());
    }

    constructor(dataFile: string) {
        this.dataFile = dataFile;
    }

    public abstract getData(): Promise<T>;
}
