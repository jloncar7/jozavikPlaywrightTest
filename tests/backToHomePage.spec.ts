import { test, expect } from '@playwright/test';

//otvori nasu demo stranicu, dodaj assertionse
test('check home button redirects correctly', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect.soft(page).toHaveTitle('STORE')
    //odi na neku stranicu
    await page.getByRole('link', { name: 'Monitors' }).click();
    await page.getByRole('link', { name: 'ASUS Full HD' }).click();
    //stisni home gumb
    await page.getByRole('link', { name: 'PRODUCT STORE' }).click();
    //potvrdi da smo na homepageu
    await page.getByText('CATEGORIES').isVisible();
});