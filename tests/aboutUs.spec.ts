import { test, expect } from '@playwright/test';
import { AboutUsPage } from './pages/aboutUsPOM';

test.describe('about us test cases', () => {

    test('open about us page', async ({ page }) => {
        // udi u flow, otvori page
        const openAboutUs = new AboutUsPage(page);
        await openAboutUs.gotoHome();
        await openAboutUs.gotoAboutUsPage();
    });

    test('close about us page', async ({ page }) => {
        const closeAboutUs = new AboutUsPage(page);
        await closeAboutUs.gotoHome();
        await closeAboutUs.gotoAboutUsPage();
        await closeAboutUs.closeAboutUsPage();

    });

    test('about us page css checks', async ({ page }) => {
        const cssAboutUs = new AboutUsPage(page);
        await cssAboutUs.gotoHome();
        await cssAboutUs.gotoAboutUsPage();
        await cssAboutUs.Visualcheck();
    });
});