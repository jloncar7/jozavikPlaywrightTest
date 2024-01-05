import { test, expect } from '@playwright/test';

//otvori nasu demo stranicu, dodaj assertionse
test('test', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect(page).toHaveTitle('STORE')
});