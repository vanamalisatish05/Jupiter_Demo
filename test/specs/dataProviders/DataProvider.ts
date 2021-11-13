/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as fs from 'fs';
import * as path from 'path';

export default abstract class DataProvider<T> {
    protected dataFile: string;
    
    protected getJsonData(): any {
        const filePath = path.join(__dirname, `../../${this.dataFile}`);
        const value = fs.readFileSync(filePath);
        return JSON.parse(value.toString());
    }

    constructor(dataFile: string) {
        this.dataFile = dataFile;
    }

    public abstract getData(): T;
}
