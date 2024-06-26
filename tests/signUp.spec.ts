import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

test.describe('signup test cases', () => {

    //signup funkcija
    test('signup already existing account', async ({ page }) => {
        page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('This user already exist.')
            dialog.accept();
        });
        //odi na stranicu
        await page.goto('https://www.demoblaze.com/index.html');
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
        await page.getByRole('link', { name: 'Sign up' }).click();
        await page.getByLabel('Username:').click();
        await page.getByLabel('Username:').fill('nekiLik1');
        await page.getByLabel('Password:').click();
        await page.getByLabel('Password').fill('dobrasifra1');
        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    test('new account signup', async ({ page }) => {
        page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Sign up successful.')
            dialog.accept();
        });
        const username = faker.internet.userName();
        const password = faker.internet.password();
        //odi na stranicu
        await page.goto('https://www.demoblaze.com/index.html');
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
        await page.getByRole('link', { name: 'Sign up' }).click();
        await page.getByLabel('Username:').click();
        await page.getByLabel('Username:').fill(username);
        await page.getByLabel('Password:').click();
        await page.getByLabel('Password').fill(password);
        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    test('username and password fields blank', async ({ page }) => {
        page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Please fill out Username and Password.')
            dialog.accept();
        });
        //odi na stranicu
        await page.goto('https://www.demoblaze.com/index.html');
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
        await page.getByRole('link', { name: 'Sign up' }).click();
        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    test('password field blank', async ({ page }) => {
        page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Please fill out Username and Password.')
            dialog.accept();
        });
        const username = faker.internet.userName();
        //odi na stranicu
        await page.goto('https://www.demoblaze.com/index.html');
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
        await page.getByRole('link', { name: 'Sign up' }).click();
        await page.getByRole('button', { name: 'Sign up' }).click();
        await page.getByLabel('Username:').click();
        await page.getByLabel('Username:').fill(username);


    });

    test('username field blank', async ({ page }) => {
        page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Please fill out Username and Password.')
            dialog.accept();
        });
        const password = faker.internet.password();
        //odi na stranicu
        await page.goto('https://www.demoblaze.com/index.html');
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
        await page.getByRole('link', { name: 'Sign up' }).click();
        await page.getByRole('button', { name: 'Sign up' }).click();
        await page.getByLabel('Password:').click();
        await page.getByLabel('Password:').fill(password);


    });

    test('signup css checks', async ({ page }) => {
        const username = faker.internet.userName();
        await page.goto('https://www.demoblaze.com/index.html');
        await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
        await page.getByRole('link', { name: 'Sign up' }).click();
        await expect(page.locator('#sign-username.form-control')).toHaveCSS('color', 'rgb(70, 74, 76)');
        await expect(page.locator('#sign-password.form-control')).toHaveCSS('color', 'rgb(70, 74, 76)');
        await expect(page.getByRole('button', { name: 'Sign up' })).toHaveCSS('background-color', 'rgb(2, 117, 216)');
    });
});