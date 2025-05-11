const { expect } = require('@playwright/test');
      
class BillPayPage {
    constructor(page) {
        this.page = page;
        this.payeeName = '//input[@name="payee.name"]';
        this.payeeAddress = '//input[@name="payee.address.street"]';
        this.payeeCity = '//input[@name="payee.address.city"]';
        this.payeeState = '//input[@name="payee.address.state"]';
        this.payeeZipCode = '//input[@name="payee.address.zipCode"]';
        this.phoneInput = '//input[@name="payee.phoneNumber"]';
        this.payeeAcountNum = '//input[@name="payee.accountNumber"]';
        this.vefiryAccountNum = '//input[@name="verifyAccount"]';
        this.amount = '//input[@name="amount"]';
        this.sendPayment = '//input[@value="Send Payment"]'
        this.successMessage = '//h1[contains(text(),"Bill Payment Complete")]';
    }

    async verifyPayBillSuccessful() {
        await expect(this.page.locator(this.successMessage)).toBeVisible();
    }
}

module.exports = BillPayPage;