const { expect } = require('@playwright/test');
      
class OpenAccountPage {
    constructor(page) {
        this.page = page;
        this.openNewAccount = '//input[@value="Open New Account"]';
        this.fromAccountId = '//select[@id="fromAccountId"]';
        this.accountIdHolder = '//*[@id="newAccountId"]';
        this.successMessage = '//*[contains(text(),"Account Opened!")]';
        

    }

    async verifyAccountCreationSuccessful() {
        await expect(this.page.locator(this.successMessage)).toBeVisible();
    }


}

module.exports = OpenAccountPage;