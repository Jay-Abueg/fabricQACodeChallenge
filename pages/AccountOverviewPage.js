const { expect } = require('@playwright/test');
const { stringToNumber } = require('../utils/helpers');
      
class AccountOverviewPage {
    constructor(page) {
        this.page = page;
        this.accountTable = 'table tbody tr';

    }

    async verifyNewAccount(accountId) {
        const tableRow = this.page.locator('table tbody tr'); 
        await expect(tableRow.nth(1)).toContainText(accountId);
    }

    async verifyTotalAccountBalance() {
        let totalBal, currentBal;
     
        // const accnt1 = this.page.locator('//tbody/tr[1]/td[2]').innerText();
        // const accnt2 = this.page.locator('//tbody/tr[2]/td[2]').innerText();
        // totalBal = accnt1 + accnt2;
        // currentBal = this.page.locator('//tbody/tr[3]/td[2]').innerText();
        // expect(accnt1).toEqual(accnt2);
    }

}

module.exports = AccountOverviewPage;