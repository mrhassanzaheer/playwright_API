import { test, expect, chromium } from '@playwright/test';
import { loginPage } from './../Pages/loginPage';
const formdata = JSON.parse(JSON.stringify(require("./../fixture/OrangeHR.json")));

test.describe('API interception test', () => {
    let browser;
    let context;
    let page;

    test.beforeAll(async () => {
        // Launch a new browser instance
        browser = await chromium.launch();
        context = await browser.newContext();
        page = await context.newPage();
    });

    test.afterAll(async () => {
        // Close the browser instance
        await browser.close();
    });

    test('should intercept API call on login with name of API', async () => {
        const loginpage = new loginPage(page);
        // Set up request interceptor to capture the API call
        await context.route('**/dashboard/employees/action-summary', route => {
            const postData = route.request().postData();
            console.log('API call intercepted');
            route.continue();
        });

        // Navigate to the login page
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Fill in the login form and click the login button
        loginpage.fillForm(formdata.username, formdata.password);

        // Wait for the API call to be intercepted
        const response = await page.waitForResponse('**/dashboard/employees/action-summary');

        // Assert on the response status code
        expect(response.status()).toBe(200);

        // Parse the response JSON
        const responseData = await response.json();

        // Assert on the response data not being null
        expect(responseData).not.toBeNull;
        console.log("API DATA WITH NAME:", responseData)
    });
});