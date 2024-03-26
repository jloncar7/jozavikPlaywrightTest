import { expect, type Locator, type Page } from '@playwright/test';

export class LoginLogoutPage {
    readonly page: Page;
    readonly closeLogin: Locator;
    readonly usernameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly logInButton: Locator;
    readonly closeButton: Locator;
    readonly logInHeader: Locator;


    constructor(page: Page) {

        this.page = page
        this.closeLogin = page.getByLabel('Log in').getByText('Close')
        this.usernameTextBox = page.locator('#loginusername')
        this.passwordTextBox = page.locator('#loginpassword')
        this.logInButton = page.getByRole('button', { name: 'Log in' })
        this.closeButton = page.getByLabel('Log in').getByText('Close')
        this.logInHeader = page.getByRole('heading', { name: 'Log in', exact: true })
    }

    async gotoLoginLogoutPage() {
        await this.page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(this.page).toHaveURL('https://www.demoblaze.com/index.html');
        await this.logInButton.click();
        await expect.soft(this.logInHeader).toBeVisible();
    }

    async closeLoginLogoutPage() {
        await this.page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(this.page).toHaveURL('https://www.demoblaze.com/index.html');
        await this.logInButton.click();
        await this.closeButton.click();
        await expect.soft(expect.soft(this.logInHeader).not.toBeVisible());
    }

    async loginExistingAccount(username, password) {
        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.logInButton.click()
    }

}