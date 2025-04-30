import {ContactData} from '../../model/data/index.js';
import DataProvider from './DataProvider.js';

export default class ContactDataProvider extends DataProvider<ContactData[]> {
    public getData(): ContactData[] {
        return this.getJsonData() as ContactData[];
    }
}


