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
        await pruductStoreRedirect.productStoreButtonRedirect();
    });

    test('check home button redirects correctly', async ({ page }) => {
        const homeButton = new HomePage(page);
        await homeButton.gotoHomePage();
        await homeButton.homeButtonRedirect();

    });

    test('check categories button redirects to home', async ({ page }) => {
        const categoriesButtonRedirect = new HomePage(page);
        await categoriesButtonRedirect.gotoHomePage();
        await categoriesButtonRedirect.categoriesButtonRedirect();
    });

    test('categories - check only phones are visible', async ({ page }) => {
        const categoriesPhoneCheck = new HomePage(page);
        await categoriesPhoneCheck.gotoHomePage();
        await categoriesPhoneCheck.gotoPhones();
    });

    test('categories - check only laptops are visible', async ({ page }) => {
        const categoriesLaptopCheck = new HomePage(page);
        await categoriesLaptopCheck.gotoHomePage();
        await categoriesLaptopCheck.gotoLaptops();


    });

    test('categories - check only monitors are visible', async ({ page }) => {
        const categoriesMonitorCheck = new HomePage(page);
        await categoriesMonitorCheck.gotoHomePage();
        await categoriesMonitorCheck.gotoMonitors();
    });

    test('homepage css tests', async ({ page }) => {
        const homePageCSS = new HomePage(page);
        await homePageCSS.gotoHomePage();
        await homePageCSS.homePageVisualCheck();
    });
});