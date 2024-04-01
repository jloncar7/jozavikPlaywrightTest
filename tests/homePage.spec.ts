import { test, expect } from '@playwright/test';
import { normalize } from 'path';
import { HomePage } from './pages/homePagePOM.ts';

test.describe('homepage test cases', () => {

    //otvori nasu demo stranicu
    test('open main page', async ({ page }) => {
        const openHome = new HomePage(page);
        await openHome.gotoHomePage();
    });

    //otvori nasu demo stranicu, dodaj assertionse
    test('check product store logo redirects correctly', async ({ page }) => {
        const pruductStoreRedirect = new HomePage(page);
        await pruductStoreRedirect.gotoHomePage();
        //odi na neku stranicu
        await page.getByRole('link', { name: 'Monitors' }).click();
        await page.getByRole('link', { name: 'ASUS Full HD' }).click();
        //stisni home gumb
        await page.getByRole('link', { name: 'PRODUCT STORE' }).click();
        //potvrdi da smo na homepageu
        await page.getByText('CATEGORIES').isVisible();
    });

    test('check home button redirects correctly', async ({ page }) => {
        const homeButtonRedirect = new HomePage(page);
        await homeButtonRedirect.gotoHomePage();
        await page.getByRole('link', { name: 'Laptops' }).click();
        await page.getByRole('link', { name: 'MacBook Pro' }).click();
        await page.getByRole('link', { name: 'Home' }).click();
        await page.getByText('CATEGORIES').isVisible();
        await expect.soft(page.getByText('MacBook air')).not.toBeVisible();

    });

    test('check categories button redirects to home', async ({ page }) => {
        const categoriesButtonRedirect = new HomePage(page);
        await categoriesButtonRedirect.gotoHomePage();
        await page.getByRole('link', { name: 'Monitors' }).click();
        await page.getByRole('link', { name: 'CATEGORIES' }).click();
        await page.getByText('Nexus 6').isVisible();
        await expect.soft(page.getByText('MacBook air')).not.toBeVisible();

    });

    test('categories - check only phones are visible', async ({ page }) => {
        const categoriesPhoneCheck = new HomePage(page);
        await categoriesPhoneCheck.gotoHomePage();
        await categoriesPhoneCheck.gotoPhones();
    });

    test('categories - check only laptops are visible', async ({ page }) => {
        const categoriesLaptopCheck = new HomePage(page);
        await categoriesLaptopCheck.gotoHomePage();
        await page.getByRole('link', { name: 'Laptops' }).click();
        await page.getByText('Sony vaio i5').isVisible();
        await page.getByText('2017 Dell 15.6 Inch').isVisible();
        await page.getByText('Sony xperia z5').isVisible();
        await expect.soft(page.getByText('Nokia lumia 1520')).not.toBeVisible();
        await expect.soft(page.getByText('Apple monitor 24')).not.toBeVisible();

    });

    test('categories - check only monitors are visible', async ({ page }) => {
        const categoriesMonitorCheck = new HomePage(page);
        await categoriesMonitorCheck.gotoHomePage();
        await page.getByRole('link', { name: 'Monitors' }).click();
        await page.getByText('Apple monitor 24').isVisible();
        await page.getByText('ASUS Full HD').isVisible();
        await expect.soft(page.getByText('Nokia lumia 1520')).not.toBeVisible();
        await expect.soft(page.getByText('Iphone 6 32gb')).not.toBeVisible();

    });

    test('homepage css tests', async ({ page }) => {
        // navigiraj na stranicu
        const homePageCSS = new HomePage(page);
        await homePageCSS.gotoHomePage();
        await expect(page.locator('#tbodyid')).toHaveCSS('outline-color', 'rgb(134, 134, 136)');
        await expect(page.locator('#footc')).toHaveCSS('background-image', 'linear-gradient(to right, rgb(135, 15, 93) 0%, rgb(135, 15, 93) 19%, rgb(63, 41, 133) 55%, rgb(40, 17, 115) 100%)');
    });
});