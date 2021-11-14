import {ContactData} from '../data';
import BasePage from './BasePage';

export default class ContactPage extends BasePage {
    // eslint-disable-next-line @typescript-eslint/require-await
    async init(): Promise<this> {
        // TODO put here code that waits for page to be ready
        return this;
    }

    async getSuccessMessage(): Promise<string> {
        await this.page.locator('.alert-success').waitFor({state: 'visible', timeout: 60000});
        return this.page.locator('.alert-success').innerText();
    }

    async setMessage(message: string): Promise<ContactPage> {
        await this.page.locator('#message').fill(message);
        return this;
    }

    async setEmail(email: string): Promise<ContactPage> {
        await this.page.locator('#email').fill(email);
        return this;
    }

    async setForename(forename: string): Promise<ContactPage> {
        await this.page.locator('#forename').fill(forename);
        return this;
    }

    async setLastname(lastname: string): Promise<ContactPage> {
        await this.page.locator('#surname').fill(lastname);
        return this;
    }

    async setTelephone(telephone: string): Promise<ContactPage> {
        await this.page.locator('#telephone').fill(telephone);
        return this;
    }

    async setContactData(contactData: ContactData): Promise<ContactPage> {
        if (contactData.forename !== undefined) await this.setForename(contactData.forename);
        if (contactData.lastname !== undefined) await this.setLastname(contactData.lastname);
        if (contactData.email !== undefined) await this.setEmail(contactData.email);
        if (contactData.telephone !== undefined) await this.setTelephone(contactData.telephone);
        if (contactData.message !== undefined) await this.setMessage(contactData.message);
        return this;
    }

    async getForenameError(): Promise<string> {
        return this.getErrorText('#forename-err');
    }

    async getEmailError(): Promise<string> {
        return this.getErrorText('#email-err');
    }

    async getMessageError(): Promise<string> {
        return this.getErrorText('#message-err');
    }

    private async getErrorText(locator: string): Promise<string> {
        const errors = await this.page.locator(locator).count();
        if (errors === 0) {
            return '';
        }
        return await this.page.locator(locator).nth(0).innerText();
    }

    async clickSubmitButton(): Promise<ContactPage> {
        await this.page.locator('#contact-submit-btn').click();
        return this;
    }
}
