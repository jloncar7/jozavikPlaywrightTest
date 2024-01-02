import { test, expect } from '@playwright/test';

//otvori nasu demo stranicu
test('test', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
});