import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;


    constructor(page: Page) {

        this.page = page
    }

    async gotoHomePage() {
        await this.page.goto('https://www.demoblaze.com/index.html');
        await expect(this.page).toHaveURL('https://www.demoblaze.com/index.html');
        await expect.soft(this.page).toHaveTitle('STORE');
        await this.page.getByText('CATEGORIES').isVisible();

    }
}