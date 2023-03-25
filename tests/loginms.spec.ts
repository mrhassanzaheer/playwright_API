import { test, expect, chromium, webkit } from '@playwright/test';

test('ms', async () => {
    const browser = await webkit.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the login page
    await page.goto('https://learn.microsoft.com');

    // Click the Sign In button
    await page.click('.docs-sign-in.auth-status-determined.not-authenticated');

    // Fill in the login form
    await page.fill('input[name="loginfmt"]', 'hassanzaheer1995@hotmail.com');
    await page.click('#idSIButton9');
    //await page.click('#idA_PWD_SwitchToPassword');
    // Wait for the password field to appear
    await page.waitForSelector('#i0118');

    // Fill in the password field
    await page.fill('input[name="passwd"]', 'Zlumasha1122');
    await page.click('#idSIButton9');

    // Wait for the login to complete
    await page.waitForNavigation();

    // Login is now complete, you can interact with the website as a logged in user.

    // Close the browser
    await browser.close();
})
