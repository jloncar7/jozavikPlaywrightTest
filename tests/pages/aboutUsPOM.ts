import { expect, type Locator, type Page } from '@playwright/test';

export class AboutUsPage {
    readonly page: Page;
    readonly aboutUsButton: Locator;
    readonly aboutUsCloseButton: Locator;
    readonly aboutUsXButton: Locator;
    readonly aboutUsHeader: Locator;
    readonly aboutUsVideo: Locator;



    constructor(page: Page) {

        this.page = page
        this.aboutUsButton = page.getByRole('link', { name: 'About us' })
        this.aboutUsCloseButton = page.locator('#videoModal').getByText('Close', { exact: true })
        this.aboutUsXButton = page.locator('#videoModal').getByLabel('Close');
        this.aboutUsHeader = page.getByRole('heading', { name: 'About us', exact: true })
        this.aboutUsVideo = page.locator('#example-video')
    }

    async gotoHome() {
        await this.page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(this.page).toHaveTitle('STORE')
    }

    async gotoAboutUsPage() {
        await this.aboutUsButton.click();
        await expect.soft(this.aboutUsHeader).toBeVisible();
        await expect(this.aboutUsVideo).toBeVisible();
    }

    async closeAboutUsPage() {
        await this.aboutUsCloseButton.click();
        await expect.soft(this.aboutUsHeader).not.toBeVisible();
    }

    async Visualcheck() {
        await expect.soft(this.aboutUsHeader).toBeVisible();
        await expect(this.aboutUsVideo).toBeVisible();
        await expect(this.aboutUsXButton).toBeVisible();


    }
}