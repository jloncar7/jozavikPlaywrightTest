import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';
import { LoginLogoutPage } from './pages/loginLogoutPOM.ts';

test.describe('login/logout test cases', () => {

    test('open log in page', async ({ page }) => {
        const openLogin = new LoginLogoutPage(page);
        await openLogin.gotoLoginLogoutPage();
    });

    test('close log in page', async ({ page }) => {
        const closeLogin = new LoginLogoutPage(page);
        await closeLogin.gotoLoginLogoutPage();
        await closeLogin.closeLoginLogoutPage();
    });

    //login funkcija
    test('login with existing account', async ({ page }) => {
        const LoginExisting = new LoginLogoutPage(page);
        await LoginExisting.gotoLoginLogoutPage();
        await LoginExisting.loginExistingAccount('nekiLik1', 'dobrasifra1');
    });

    test('logout', async ({ page }) => {
        const logOutTest = new LoginLogoutPage(page);
        await logOutTest.gotoLoginLogoutPage();
        await logOutTest.loginExistingAccount('nekiLik1', 'dobrasifra1');
        await logOutTest.logOut();
    });

    test('login with nonexisting account', async ({ page }) => {
        const loginNonExisting = new LoginLogoutPage(page);
        await loginNonExisting.gotoLoginLogoutPage();
        await loginNonExisting.logInMissingAccount();
    });

    test('login with no credentials', async ({ page }) => {
        const blankCredentials = new LoginLogoutPage(page);
        await blankCredentials.gotoLoginLogoutPage();
        await blankCredentials.logInNoCredentials();
    });

    test('login with blank username field', async ({ page }) => {
        const blankUsernameField = new LoginLogoutPage(page);
        await blankUsernameField.gotoLoginLogoutPage();
        await blankUsernameField.blankUsername();
    });

    test('login with blank password field', async ({ page }) => {
        const blankPasswordField = new LoginLogoutPage(page);
        await blankPasswordField.gotoLoginLogoutPage();
        await blankPasswordField.blankPassword();
    });

    test('login css checks', async ({ page }) => {
        const loginCSStest = new LoginLogoutPage(page);
        await loginCSStest.gotoLoginLogoutPage();
        await loginCSStest.loginCSSCheck();
    });

});