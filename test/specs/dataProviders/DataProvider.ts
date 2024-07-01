 
import * as fs from 'fs';
import * as path from 'path';
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default abstract class DataProvider<T> {
    protected dataFile: string;
    
    protected getJsonData(): unknown {
        const filePath = path.join(__dirname, `../../${this.dataFile}`);
        const value = fs.readFileSync(filePath);
        return JSON.parse(value.toString());
    }

    constructor(dataFile: string) {
        this.dataFile = dataFile;
    }

    public abstract getData(): T;
}
