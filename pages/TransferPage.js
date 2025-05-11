const { expect } = require('@playwright/test');
      
class TransferPage {
    constructor(page) {
        this.page = page;
        this.amount = '//input[@id="amount"]';
        this.fromAccountId ='//select[@id="fromAccountId"]';
        this.transferButton = '//input[@value="Transfer"]';

    }

    async selectAccount(accountId) {
        await this.page.locator('//select[@id="fromAccountId"]//option[@value="' + accountId + '"]').click();
    }

}

module.exports = TransferPage;