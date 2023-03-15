import { Page } from "@playwright/test";

export class loginPage {
    private page: Page;
    private inputUsername;
    private inputPassword;
    private submitButton;
    constructor(page) {
        this.page = page;
        this.inputUsername = page.locator('//input[@name="username"]');
        this.inputPassword = page.locator("//input[@name='password']");
        this.submitButton = page.locator("//button[@type='submit']");
    }

    async fillForm(username, password) {
        await this.inputUsername.fill(username);
        await this.inputPassword.fill(password);
        await this.submitButton.click();
    }
}