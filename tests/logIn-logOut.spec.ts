import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

test('open log in page', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect.soft(page.getByRole('heading', { name: 'Log in', exact: true })).toBeVisible();
});

test('close log in page', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();
    await expect.soft(page.getByRole('heading', { name: 'Log in', exact: true })).toBeVisible();
    await page.getByLabel('Log in').getByText('Close').click();
    await expect.soft(page.getByRole('heading', { name: 'Log in', exact: true })).not.toBeVisible();

});

//login funkcija
test('login with existing account', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await expect.soft(page).toHaveURL('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').click();
    await page.locator('#loginusername').fill('nekiLik1');
    await page.locator('#loginpassword').click();
    await page.locator('#loginpassword').fill('dobrasifra1');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect.soft(page.getByText('Welcome nekiLik1')).toBeVisible();
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