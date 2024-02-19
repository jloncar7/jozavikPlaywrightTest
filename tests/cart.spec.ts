import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en';

test('check item is added to cart', async ({ page }) => {
    // navigiraj na stranicu
    await page.goto('https://www.demoblaze.com/index.html');
    // klikni na samsung s6
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    // klikni na add to cart
    await page.getByRole('link', { name: 'Add to cart' }).click();
    // rijesi se pop-upa
    page.on('dialog', dialog => {
        dialog.accept();
        expect.soft(dialog.message()).toContain('Product added')
    });
    // klikni na cart
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    // assertion za kraj
    await expect.soft(page.getByText('Samsung galaxy s6')).toBeVisible();
});

test('check item is removed from cart', async ({ page }) => {
    //odi na stranicu
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await expect.soft(page).toHaveTitle('STORE')
    //klikni na laptops
    await page.getByRole('link', { name: 'Laptops' }).click();
    //klikni na mac i dodaj ga u cart
    await page.getByRole('link', { name: 'MacBook air' }).click();
    await page.getByRole('link', { name: 'Add to cart' }).click();
    //rijesi se dijaloga
    page.on('dialog', dialog => {
        dialog.accept();
        expect.soft(dialog.message()).toContain('Product added')
    });
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
    // rijesi se pop-upa
    page.on('dialog', dialog => {
        dialog.accept();
        expect.soft(dialog.message()).toContain('Product added')
    });
    await page.getByRole('link', { name: 'Home' }).click();
    await page.getByText('CATEGORIES').isVisible();
    await page.getByRole('link', { name: 'Nexus 6' }).click();
    await page.getByRole('link', { name: 'Add to cart' }).click();
    page.on('dialog', dialog => {
        dialog.accept();
        expect.soft(dialog.message()).toContain('Product added')
    });
    // klikni na cart
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
    // navigiraj na stranicu
    await page.goto('https://www.demoblaze.com/index.html');
    // klikni na samsung s6
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();
    // klikni na add to cart
    await page.getByRole('link', { name: 'Add to cart' }).click();
    // rijesi se pop-upa
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await page.getByRole('button', { name: 'Place Order' }).click()
    await page.getByRole('button', { name: 'Purchase' }).click()
    page.on('dialog', dialog => {
        dialog.accept();
        expect.soft(dialog.message()).toContain('Please fill out Name and Creditcard.')
    });
});

test('place order without entering name and CC', async ({ page }) => {
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
    // rijesi se pop-upa
    page.on('dialog', dialog => {
        dialog.accept();
        expect.soft(dialog.message()).toContain('Product added')
    });
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
    page.on('dialog', dialog => {
        dialog.accept();
        expect.soft(dialog.message()).toContain('Please fill out Name and Creditcard.')
    });
});