import {ContactData} from '../../model/data/index.ts';
import DataProvider from './DataProvider.ts';

export default class ContactDataProvider extends DataProvider<ContactData[]> {
    public getData(): ContactData[] {
        return this.getJsonData() as ContactData[];
    }
}


