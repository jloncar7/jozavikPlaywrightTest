import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly phonesLink: Locator;
    readonly laptopsLink: Locator;
    readonly monitorsLink: Locator;


    constructor(page: Page) {

        this.page = page
        this.phonesLink = page.getByRole('link', { name: 'Phones' });
        this.laptopsLink = page.getByRole('link', { name: 'Laptops' });
        this.monitorsLink = page.getByRole('link', { name: 'Monitors' });
    }

    async gotoHomePage() {
        await this.page.goto('https://www.demoblaze.com/index.html');
        await expect(this.page).toHaveURL('https://www.demoblaze.com/index.html');
        await expect.soft(this.page).toHaveTitle('STORE');
        await this.page.getByText('CATEGORIES').isVisible();

    }

    async gotoPhones() {
        await this.phonesLink.click();
        await this.page.getByText('Samsung galaxy s6').isVisible();
        await this.page.getByText('Nexus 6').isVisible();
        await expect.soft(this.page.getByText('MacBook air')).not.toBeVisible();
        await expect.soft(this.page.getByText('Apple monitor 24')).not.toBeVisible();
    }
}