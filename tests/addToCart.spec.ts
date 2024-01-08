import { test, expect } from '@playwright/test';

test('Add to cart', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    await page.getByRole('link', { name: 'Add to cart' }).click();
    page.on('dialog', dialog => {
        dialog.accept();
    });
    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await expect(page.getByText('Products')).toBeVisible();
});