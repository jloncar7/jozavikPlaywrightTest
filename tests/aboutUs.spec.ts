import { test, expect } from '@playwright/test';
import { AboutUsPage } from './pages/aboutUsPOM';

test.describe('about us test cases', () => {

    test('open about us page', async ({ page }) => {
        const openAboutUs = new AboutUsPage(page);
        await openAboutUs.gotoAboutUs();
    });

    test('close about us page', async ({ page }) => {
        const closeAboutUs = new AboutUsPage(page);
        await closeAboutUs.gotoAboutUs();
        await page.locator('#videoModal').getByText('Close', { exact: true }).click();
        await expect.soft(page.getByRole('heading', { name: 'About us', exact: true })).not.toBeVisible();
    });

    test('about us page css checks', async ({ page }) => {
        const cssAboutUs = new AboutUsPage(page);
        await cssAboutUs.gotoAboutUs();
        await expect(page.locator('#videoModalLabel')).toBeVisible();

    });
});