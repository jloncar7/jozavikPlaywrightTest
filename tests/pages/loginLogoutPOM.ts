import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

export class LoginLogoutPage {
    readonly page: Page;
    readonly closeLogin: Locator;
    readonly usernameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly logInButtonHeader: Locator;
    readonly logInButton: Locator;
    readonly logOutButton: Locator;
    readonly closeButton: Locator;
    readonly logInHeaderWindow: Locator;


    constructor(page: Page) {

        this.page = page
        this.closeLogin = page.getByLabel('Log in').getByText('Close')
        this.usernameTextBox = page.locator('#loginusername')
        this.passwordTextBox = page.locator('#loginpassword')
        this.logInButtonHeader = page.getByRole('link', { name: 'Log in' })
        this.logInButton = page.getByRole('button', { name: 'Log in' })
        this.logOutButton = page.getByRole('link', { name: 'Log out' })
        this.closeButton = page.getByLabel('Log in').getByText('Close')
        this.logInHeaderWindow = page.getByRole('heading', { name: 'Log in', exact: true })
    }

    async gotoLoginLogoutPage() {
        await this.page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(this.page).toHaveURL('https://www.demoblaze.com/index.html');
        await this.logInButtonHeader.click();
        await expect.soft(this.logInHeaderWindow).toBeVisible();
    }

    async closeLoginLogoutPage() {
        await this.closeButton.click();
        await expect.soft(this.logInHeaderWindow).not.toBeVisible();
    }

    async loginExistingAccount(username, password) {
        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.logInButton.click()
    }

    async logOut() {
        await this.logOutButton.click();
    }

    async logInMissingAccount() {
        this.page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('User does not exist.')
            dialog.accept();
        });
        const username = faker.internet.userName();
        const password = faker.internet.password();
        await this.usernameTextBox.fill(username);
        await this.passwordTextBox.fill(password);
        await this.logInButton.click();
    }

    async logInNoCredentials() {
        this.page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Please fill out Username and Password.')
            dialog.accept();
        });
        await this.logInButton.click();
    }

    async blankUsername() {
        this.page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Please fill out Username and Password.')
            dialog.accept();
        });
        const password = faker.internet.password();
        await this.passwordTextBox.fill(password);
        await this.logInButton.click();
    };

    async blankPassword() {
        this.page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Please fill out Username and Password.')
            dialog.accept();
        });
        const username = faker.internet.userName();
        await this.usernameTextBox.fill(username);
        await this.logInButton.click();
    };

    async loginCSSCheck() {
        await expect(this.usernameTextBox).toHaveCSS('color', 'rgb(70, 74, 76)');
        await expect(this.passwordTextBox).toHaveCSS('color', 'rgb(70, 74, 76)');
        await expect(this.logInButton).toHaveCSS('background-color', 'rgb(2, 117, 216)');
    };
}