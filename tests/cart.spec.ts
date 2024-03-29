import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

test.describe('cart test cases', () => {

    test('check item is added to cart', async ({ page }) => {
        //listener za popup
        page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Product added')
            dialog.accept();
        });
        // navigiraj na stranicu
        await page.goto('https://www.demoblaze.com/index.html');
        // klikni na samsung s6
        await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
        // klikni na add to cart
        await page.getByRole('link', { name: 'Add to cart' }).click();
        // klikni na cart
        await page.getByRole('link', { name: 'Cart', exact: true }).click();
        // assertion za kraj
        await expect.soft(page.getByText('Samsung galaxy s6')).toBeVisible();
    });

    test('check item is removed from cart', async ({ page }) => {
        // listener za dialog message
        page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Product added')
            dialog.accept();
        });
        //odi na stranicu
        await page.goto('https://www.demoblaze.com/index.html');
        await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
        await expect.soft(page).toHaveTitle('STORE')
        //klikni na laptops
        await page.getByRole('link', { name: 'Laptops' }).click();
        //klikni na mac i dodaj ga u cart
        await page.getByRole('link', { name: 'MacBook air' }).click();
        await page.getByRole('link', { name: 'Add to cart' }).click();
        // pricekaj jer stranica ima nekakav delay
        await page.waitForTimeout(2000);
        //odi u cart
        await page.getByRole('link', { name: 'Cart', exact: true }).click();
        //provjeri da nam je item unutra
        await expect.soft(page.getByText('MacBook air')).toBeVisible();
        //makni iz carta
        await page.getByRole('link', { name: 'Delete' }).click();
        //provjeri da ga nema
        await expect.soft(page.getByText('MacBook air')).not.toBeVisible();
    });

    test('place order successfully', async ({ page }) => {
        // listener za popup
        page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Product added')
            dialog.accept();
        });
        // deklaracija fake informacija o osobi
        const randomName = faker.person.fullName();
        const country = faker.location.country();
        const city = faker.location.city();
        const creditCard = faker.finance.creditCardNumber();
        const month = faker.date.month();
        // odi na stranicu
        await page.goto('https://www.demoblaze.com/index.html');
        // klikni na samsung s6
        await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
        // klikni na add to cart
        await page.getByRole('link', { name: 'Add to cart' }).click();
        // klikni na home
        await page.getByRole('link', { name: 'Home' }).click();
        // provjera da smo na home pageu
        await page.getByText('CATEGORIES').isVisible();
        // klikni na nexus 6 i dodaj ga u cart
        await page.getByRole('link', { name: 'Nexus 6' }).click();
        await page.getByRole('link', { name: 'Add to cart' }).click();
        // klikni na cart i ispunjavanje fejk podataka
        await page.getByRole('link', { name: 'Cart', exact: true }).click();
        await page.getByRole('button', { name: 'Place Order', exact: true }).click();
        await page.getByLabel('Total:').click();
        await page.getByLabel('Total:').fill(randomName);
        await page.getByLabel('Country:').click();
        await page.getByLabel('Country:').fill(country);
        await page.getByLabel('City:').click();
        await page.getByLabel('City:').fill(city);
        await page.getByLabel('Credit card:').click();
        await page.getByLabel('Credit card:').fill(creditCard);
        await page.getByLabel('Month:').click();
        await page.getByLabel('Month:').fill(month);
        await page.getByLabel('Year:').click();
        await page.getByLabel('Year:').fill('2025');
        await page.getByRole('button', { name: 'Purchase' }).click();
        await page.getByText('Thank you for your purchase!').isVisible();
        await page.getByRole('button', { name: 'OK' }).click();
        await page.getByText('CATEGORIES').isVisible();
    });

    test('place order with blank personal information screen ', async ({ page }) => {
        // listener za popup
        page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Please fill out Name and Creditcard.')
            dialog.accept();
        });
        //odi na stranicu
        await page.goto('https://www.demoblaze.com/index.html');
        // klikni na samsung s6
        await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
        // klikni na add to cart
        await page.getByRole('link', { name: 'Add to cart' }).click();
        await page.getByRole('link', { name: 'Cart', exact: true }).click();
        await page.getByRole('button', { name: 'Place Order' }).click()
        await page.getByRole('button', { name: 'Purchase' }).click()
    });

    test('place order without entering name and CC', async ({ page }) => {
        // listener za popup
        page.on('dialog', dialog => {
            dialog.accept();
        });
        // navigiraj na stranicu
        const randomName = faker.person.fullName();
        const country = faker.location.country();
        const city = faker.location.city();
        const creditCard = faker.finance.creditCardNumber();
        const month = faker.date.month();
        await page.goto('https://www.demoblaze.com/index.html');
        // klikni na samsung s6
        await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
        // klikni na add to cart
        await page.getByRole('link', { name: 'Add to cart' }).click();
        // klikni na cart
        await page.getByRole('link', { name: 'Cart', exact: true }).click();
        await page.getByRole('button', { name: 'Place Order' }).click()
        await page.getByLabel('Country:').click();
        await page.getByLabel('Country:').fill(country);
        await page.getByLabel('City:').click();
        await page.getByLabel('City:').fill(city);
        await page.getByLabel('Month:').click();
        await page.getByLabel('Month:').fill(month);
        await page.getByLabel('Year:').click();
        await page.getByLabel('Year:').fill('2025');
        await page.getByRole('button', { name: 'Purchase' }).click()
    });

    test('cart css tests', async ({ page }) => {
        //listener za popup
        page.on('dialog', dialog => {
            expect.soft(dialog.message()).toContain('Product added')
            dialog.accept();
        });
        // navigiraj na stranicu
        await page.goto('https://www.demoblaze.com/index.html');
        // klikni na samsung s6
        await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
        // klikni na add to cart
        await page.getByRole('link', { name: 'Add to cart' }).click();
        // klikni na cart
        await page.getByRole('link', { name: 'Cart', exact: true }).click();
        // css provjere
        await expect(page.getByRole('table')).toHaveCSS('background', 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box');
        await expect(page.getByRole('button')).toHaveCSS('display', 'inline-block');
    });
});