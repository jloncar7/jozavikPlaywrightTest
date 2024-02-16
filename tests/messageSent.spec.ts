import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

test('open new message screen', async ({ page }) => {
    //odi na stranicu
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect.soft(page).toHaveTitle('STORE')
    //klikni na contact
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect.soft(page.getByText('New message')).toBeVisible();
    await expect.soft(page.getByText('Send message')).toBeVisible();
});

test('close new message screen', async ({ page }) => {
    //odi na stranicu
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect.soft(page).toHaveTitle('STORE')
    //klikni na contact
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect.soft(page.getByText('Send message')).toBeVisible();
    await page.getByLabel('New message').getByText('Close').click();
    await expect.soft(page.getByText('Send message')).not.toBeVisible();
});

test('send contact message', async ({ page }) => {
    //generacija fejk podataka
    const email = faker.internet.email();
    const randomName = faker.person.fullName();
    //odi na stranicu
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect.soft(page).toHaveTitle('STORE')
    //klikni na contact
    await page.getByRole('link', { name: 'Contact' }).click();
    //klikni na contact email i ubaci gore izgeneriran mail:
    await page.locator('#recipient-email').click();
    await page.locator('#recipient-email').fill(email)
    //popuni fejk ime
    await page.locator('#recipient-name').click();
    await page.locator('#recipient-name').fill(randomName)
    //ubaci neku poruku
    await page.locator('#message-text').click();
    await page.locator('#message-text').fill('This is a test message. Please do not reply to this message. Thank you.')
    //rijesi se dijaloga
    page.on('dialog', dialog => {
        dialog.accept();
        expect.soft(dialog.message()).toContain('Thanks for the message!!')
    });
});

