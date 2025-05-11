const { expect } = require('@playwright/test');
      
class HomePage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '//input[@name="username"]';
        this.passwordInput = '//input[@name="password"]';
        this.loginButton = '//input[@value="Log In"]';
        this.successLogInUrl = '//*[contains(text(), "Welcome")]';
    }


    async verifyNavigationMenu (locator){
        await this.page.locator('//*[contains(text(),"' + locator + '")]').isVisible();
        await this.page.locator('//*[contains(text(),"' + locator + '")]').click();
        if (locator == "Open New Account"){
            await expect(this.page.url()).toContain('/openaccount.htm');
        } else if (locator == "Accounts Overview"){
            await expect(this.page.url()).toContain('/overview.htm');
        } else if (locator == "Transfer Funds"){
            await expect(this.page.url()).toContain('/transfer.htm');
        } else if (locator == "Bill Pay"){
            await expect(this.page.url()).toContain('/billpay.htm');
        } else if (locator == "Find Transactions"){
            await expect(this.page.url()).toContain('/findtrans.htm');
        } else if (locator == "Update Contact Info"){
            await expect(this.page.url()).toContain('/updateprofile.htm');
        } else if (locator == "Request Loan"){
            await expect(this.page.url()).toContain('/requestloan.htm');
        }else if (locator == "Log Out"){
            await this.page.locator('//*[contains(text(), "Welcome")]').isVisible(false);
        }
    }

}

module.exports = HomePage;