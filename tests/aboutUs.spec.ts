import { test, expect } from '@playwright/test';
import { AboutUsPage } from './pages/aboutUsPOM';

test.describe('about us test cases', () => {

    test('open about us page', async ({ page }) => {
        // udi u flow, otvori page
        const openAboutUs = new AboutUsPage(page);
        await openAboutUs.gotoAboutUs();
    });

    test('close about us page', async ({ page }) => {
        // otvaranje about us pagea
        const closeAboutUs = new AboutUsPage(page);
        await closeAboutUs.gotoAboutUs();
        //zatvori video i popup
        await page.locator('#videoModal').getByText('Close', { exact: true }).click();
        // potvrdi da nemamo taj window otvoren
        await expect.soft(page.getByRole('heading', { name: 'About us', exact: true })).not.toBeVisible();
    });

    test('about us page css checks', async ({ page }) => {
        // ulazak u flow
        const cssAboutUs = new AboutUsPage(page);
        await cssAboutUs.gotoAboutUs();
        // ocekujemo da je video modal visible
        await expect(page.locator('#videoModalLabel')).toBeVisible();
    });
});