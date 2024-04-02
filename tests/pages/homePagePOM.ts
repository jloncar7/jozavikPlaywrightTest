import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly phonesLink: Locator;
    readonly laptopsLink: Locator;
    readonly monitorsLink: Locator;
    readonly categoriesButton: Locator;
    readonly homeButton: Locator;
    readonly galaxyS6: Locator;
    readonly nexus6: Locator;
    readonly macBookAir: Locator;
    readonly appleMonitor: Locator;
    readonly sonyVaioi5: Locator;
    readonly dell2017: Locator;
    readonly nokiaLumia: Locator;
    readonly asusFullHD: Locator;
    readonly iPhone6: Locator;
    readonly gridLayout: Locator;
    readonly homeFooter: Locator;
    readonly productsButton: Locator;




    constructor(page: Page) {

        this.page = page
        this.phonesLink = page.getByRole('link', { name: 'Phones' });
        this.laptopsLink = page.getByRole('link', { name: 'Laptops' });
        this.monitorsLink = page.getByRole('link', { name: 'Monitors' });
        this.categoriesButton = page.getByText('CATEGORIES');
        this.homeButton = page.getByRole('link', { name: 'Home' })
        this.productsButton = page.getByRole('link', { name: 'PRODUCT STORE' });
        this.galaxyS6 = page.getByText('Samsung galaxy s6');
        this.nexus6 = page.getByText('Nexus 6');
        this.macBookAir = page.getByText('MacBook air');
        this.appleMonitor = page.getByText('Apple monitor 24');
        this.sonyVaioi5 = page.getByText('Sony vaio i5');
        this.dell2017 = page.getByText('2017 Dell 15.6 Inch');
        this.nokiaLumia = page.getByText('Nokia lumia 1520');
        this.asusFullHD = page.getByText('ASUS Full HD');
        this.iPhone6 = page.getByText('Iphone 6 32gb');
        this.gridLayout = page.locator('#tbodyid');
        this.homeFooter = page.locator('#footc');



    }

    async gotoHomePage() {
        await this.page.goto('https://www.demoblaze.com/index.html');
        await expect(this.page).toHaveURL('https://www.demoblaze.com/index.html');
        await expect.soft(this.page).toHaveTitle('STORE');
        await this.categoriesButton.isVisible();

    }

    async gotoPhones() {
        await this.phonesLink.click();
        await this.galaxyS6.isVisible();
        await this.nexus6.isVisible();
        await expect.soft(this.macBookAir).not.toBeVisible();
        await expect.soft(this.appleMonitor).not.toBeVisible();
    }

    async gotoLaptops() {
        await this.laptopsLink.click();
        await this.sonyVaioi5.isVisible();
        await this.dell2017.isVisible();
        await expect.soft(this.nokiaLumia).not.toBeVisible();
        await expect.soft(this.appleMonitor).not.toBeVisible();
    }

    async gotoMonitors() {
        await this.monitorsLink.click();
        await this.appleMonitor.isVisible();
        await this.asusFullHD.isVisible();
        await expect.soft(this.nokiaLumia).not.toBeVisible();
        await expect.soft(this.iPhone6).not.toBeVisible();
    }

    async productStoreButtonRedirect() {
        await this.monitorsLink.click();
        await this.asusFullHD.click();
        await this.productsButton.click();
        await this.categoriesButton.isVisible();
    }

    async homeButtonRedirect() {
        await this.homeButton.click();
        await this.categoriesButton.isVisible();
    }

    async categoriesButtonRedirect() {
        await this.monitorsLink.click();
        await this.categoriesButton.click();
        await this.nexus6.isVisible();
        await expect.soft(this.macBookAir).not.toBeVisible();
    }

    async homePageVisualCheck() {
        await expect(this.gridLayout).toHaveCSS('outline-color', 'rgb(134, 134, 136)');
        await expect(this.homeFooter).toHaveCSS('background-image', 'linear-gradient(to right, rgb(135, 15, 93) 0%, rgb(135, 15, 93) 19%, rgb(63, 41, 133) 55%, rgb(40, 17, 115) 100%)');
    }
}