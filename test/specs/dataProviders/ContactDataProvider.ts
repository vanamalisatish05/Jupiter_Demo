/* eslint-disable @typescript-eslint/no-unsafe-return */


import {ContactData} from '../../model/data';
import DataProvider from './DataProvider';

export default class ContactDataProvider extends DataProvider<ContactData[]> {
    public async getData(): Promise<ContactData[]> {
        return await this.getJsonData();
    }
}
