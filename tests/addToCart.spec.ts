import { test, expect } from '@playwright/test';

test('Add to cart', async ({ page }) => {
    // navigiraj na stranicu
    await page.goto('https://www.demoblaze.com/index.html');
    // klikni na samsung s6
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    // klikni na add to cart
    await page.getByRole('link', { name: 'Add to cart' }).click();
    // rijesi se pop-upa
    page.on('dialog', dialog => {
        dialog.accept();
    });
    // klikni na cart
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    // assertion za kraj
    await expect(page.getByText('Samsung galaxy s6')).toBeVisible();
});