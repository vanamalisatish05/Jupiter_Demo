/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {ContactData} from '../../model/data/index.js';

export interface TestAPIContactData { apiContactData: ContactData;}

export default class APIContactDataProvider {
    public async getData(): Promise<ContactData> {
        const apiEnvironment = 'https://petstore3.swagger.io/api/v3';
        const response = await fetch(`${apiEnvironment}/pet/findByStatus?status=available`)
        if (!response.ok) { console.log(response)}
        const body = await response.json();
        const first = body[0].name
        
        const data: ContactData = {
            forename: first,
            lastname: 'last',
            email: 'a@b.com',
            telephone: '03030304',
            message: 'hello',
        };
        return Promise.resolve(data);
    }
}
