/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as request from 'superagent';
import {ContactData} from '../../model/data';

export type TestAPIContactData = { apiContactData: ContactData;};

export default class APIContactDataProvider {
    public async getData(): Promise<ContactData> {
        const apiEnvironment = 'https://petstore3.swagger.io/api/v3';
        const agent = request.agent();
        const res = await agent.get(`${apiEnvironment}/pet/findByStatus`)
            .withCredentials()
            .query('status=available')
            //.on('response', (r) => console.log(JSON.stringify(r)))
            .on('error', (err) => console.log(err));
            
        const first = JSON.parse(res.text)[0].name;
        
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
