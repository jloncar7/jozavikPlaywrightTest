import { test, expect } from '@playwright/test';

//signup funkcija
test('signup', async ({ page }) => {
    //odi na stranicu
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await page.getByRole('link', { name: 'Sign up' }).click();
    await page.getByLabel('Username:').click();
    await page.getByLabel('Username:').fill('nekiLik1');
    await page.getByLabel('Password:').click();
    await page.getByLabel('Password').fill('dobrasifra1');
    await page.getByRole('button', { name: 'Sign up' }).click();
    page.on('dialog', dialog => {
        dialog.accept();
    });
});

//login funkcija
test('login', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').click();
    await page.locator('#loginusername').fill('nekiLik1');
    await page.locator('#loginpassword').click();
    await page.locator('#loginpassword').fill('dobrasifra1');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByText('Welcome nekiLik1')).toBeVisible();
});