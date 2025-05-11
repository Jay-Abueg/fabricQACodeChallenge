const { expect } = require('@playwright/test');
      
class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = '//input[@id="customer.firstName"]';
        this.lastNameInput = '//input[@id="customer.lastName"]';
        this.addressInput = '//input[@id="customer.address.street"]';
        this.cityInput = '//input[@id="customer.address.city"]';
        this.stateInput = '//input[@id="customer.address.state"]';
        this.zipCodeInput = '//input[@id="customer.address.zipCode"]';
        this.phoneInput = '//input[@id="customer.phoneNumber"]';
        this.ssnInput = '//input[@id="customer.ssn"]';
        this.usernameInput = '//input[@id="customer.username"]';
        this.passwordInput = '//input[@id="customer.password"]';
        this.confirmPasswordInput = '//input[@id="repeatedPassword"]';
        this.registerButton = '//input[@value="Register"]';
        this.successMessage = 'text=Your account was created successfully.';
    }

    async goto() {
        await this.page.goto('/parabank/register.htm');
    }

    async verifyRegistrationSuccessful() {
        await expect(this.page.locator(this.successMessage)).toBeVisible();
    }
}

module.exports = RegistrationPage;