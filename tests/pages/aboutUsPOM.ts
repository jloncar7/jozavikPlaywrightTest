import { expect, type Locator, type Page } from '@playwright/test';

export class AboutUsPage {
    readonly page: Page;
    readonly aboutUsButton: Locator;
    readonly aboutUsHeader: Locator;
    readonly aboutUsVideoClose: Locator;
    readonly aboutUsVideoModal: Locator;



    constructor(page: Page) {

        this.page = page
        this.aboutUsButton = page.getByRole('link', { name: 'About us' })
        this.aboutUsHeader = page.getByRole('heading', { name: 'About us' })
        this.aboutUsVideoClose = page.locator('#videoModal').getByText('Close', { exact: true })
        this.aboutUsVideoModal = page.locator('#videoModal')
    }

    async gotoAboutUs() {
        await this.page.goto('https://www.demoblaze.com/index.html');
        await expect(this.page).toHaveURL('https://www.demoblaze.com/index.html')
        await expect.soft(this.page).toHaveTitle('STORE')
        await this.aboutUsButton.click();
        await expect.soft(this.aboutUsHeader).toBeVisible();
    }
}