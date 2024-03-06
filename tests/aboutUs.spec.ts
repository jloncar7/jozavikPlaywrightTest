import { test, expect } from '@playwright/test';

test.describe('about us test cases', () => {

    test('open about us page', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/index.html');
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
        await expect.soft(page).toHaveTitle('STORE')
        await page.getByRole('link', { name: 'About us' }).click();
        await expect.soft(page.getByRole('heading', { name: 'About us' })).toBeVisible();
    });

    test('close about us page', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/index.html');
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
        await expect.soft(page).toHaveTitle('STORE')
        await page.getByRole('link', { name: 'About us' }).click();
        await expect.soft(page.getByRole('heading', { name: 'About us' })).toBeVisible();
        await page.locator('#videoModal').getByText('Close', { exact: true }).click();
        await expect.soft(page.getByRole('heading', { name: 'About us', exact: true })).not.toBeVisible();
    });

    test('about us page css checks', async ({ page }) => {
        await page.goto('https://www.demoblaze.com/index.html');
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
        await expect.soft(page).toHaveTitle('STORE');
        await page.getByRole('link', { name: 'About us' }).click();
        await expect(page.locator('#videoModalLabel')).toBeVisible();

    });
});