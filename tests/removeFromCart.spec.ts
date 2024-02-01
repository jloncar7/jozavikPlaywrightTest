import { test, expect } from '@playwright/test';

test('remove from cart', async ({ page }) => {
    //odi na stranicu
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect.soft(page).toHaveTitle('STORE')
    //klikni na laptops
    await page.getByRole('link', { name: 'Laptops' }).click();
    //klikni na mac i dodaj ga u cart
    await page.getByRole('link', { name: 'MacBook air' }).click();
    await page.getByRole('link', { name: 'Add to cart' }).click();
    //rijesi se dijaloga
    page.on('dialog', dialog => {
        dialog.accept();
        expect.soft(dialog.message()).toContain('Product added')
    });
    //odi u cart
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    //provjeri da nam je item unutra
    await expect.soft(page.getByText('MacBook air')).toBeVisible();
    //makni iz carta
    await page.getByRole('link', { name: 'Delete' }).click();
    //provjeri da ga nema
    await expect.soft(page.getByText('MacBook air')).not.toBeVisible();
});