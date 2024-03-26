import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import { LoginLogoutPage } from './pages/loginLogoutPOM.ts';

test.describe('login/logout test cases', () => {

    test('open log in page', async ({ page }) => {
        const openLogin = new LoginLogoutPage(page);
        await openLogin.gotoLoginLogoutPage();
    });

    test('close log in page', async ({ page }) => {
        const closeLogin = new LoginLogoutPage(page);
        await closeLogin.closeLoginLogoutPage();
    });

    //login funkcija
    test('login with existing account', async ({ page }) => {
        const LoginExisting = new LoginLogoutPage(page);
        await LoginExisting.gotoLoginLogoutPage();
        await LoginExisting.loginExistingAccount('nekiLik1', 'dobrasifra1');
    });

    test('logout', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.locator('#loginusername').click();
        await page.locator('#loginusername').fill('nekiLik1');
        await page.locator('#loginpassword').click();
        await page.locator('#loginpassword').fill('dobrasifra1');
        await page.getByRole('button', { name: 'Log in' }).click();
        await expect.soft(page.getByText('Welcome nekiLik1')).toBeVisible();
        await page.getByRole('link', { name: 'Log out' }).click();
        await expect.soft(page.getByText('Welcome nekiLik1')).not.toBeVisible();
    });

    test('login with nonexisting account', async ({ page }) => {
        const username = faker.internet.userName();
        const password = faker.internet.password();
        await page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.locator('#loginusername').click();
        await page.locator('#loginusername').fill(username);
        await page.locator('#loginpassword').click();
        await page.locator('#loginpassword').fill(password);
        await page.getByRole('button', { name: 'Log in' }).click();
        page.on('dialog', dialog => {
            dialog.accept();
            expect.soft(dialog.message()).toContain('User does not exist.')
        });
    });

    //login funkcija
    test('login with no credentials', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.getByRole('button', { name: 'Log in' }).click();
        page.on('dialog', dialog => {
            dialog.accept();
            expect.soft(dialog.message()).toContain('Please fill out Username and Password.')
        });
    });

    test('login with blank username field', async ({ page }) => {
        const password = faker.internet.password();
        await page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.locator('#loginpassword').click();
        await page.locator('#loginpassword').fill(password);
        await page.getByRole('button', { name: 'Log in' }).click();
        page.on('dialog', dialog => {
            dialog.accept();
            expect.soft(dialog.message()).toContain('Please fill out Username and Password.')
        });
    });

    test('login with blank password field', async ({ page }) => {
        const username = faker.internet.userName();
        await page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.locator('#loginusername').click();
        await page.locator('#loginusername').fill(username);
        await page.getByRole('button', { name: 'Log in' }).click();
        page.on('dialog', dialog => {
            dialog.accept();
            expect.soft(dialog.message()).toContain('Please fill out Username and Password.')
        });
    });

    test('login css checks', async ({ page }) => {
        const username = faker.internet.userName();
        await page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
        await page.getByRole('link', { name: 'Log in' }).click();
        await expect(page.locator('#loginusername.form-control')).toHaveCSS('color', 'rgb(70, 74, 76)');
        await expect(page.locator('#loginpassword.form-control')).toHaveCSS('color', 'rgb(70, 74, 76)');
        await expect(page.getByRole('button', { name: 'Log in' })).toHaveCSS('background-color', 'rgb(2, 117, 216)');
    });
});