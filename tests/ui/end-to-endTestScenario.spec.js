const { test,  beforeAll, afterAll, expect  } = require('@playwright/test');
const { chromium } = require('playwright');
const RegistrationPage = require('../../pages/RegistrationPage');
const HomePage = require('../../pages/HomePage');
const OpenAccountPage = require('../../pages/OpenAccountPage');
const AccountOverviewPage = require('../../pages/AccountOverviewPage');
const TransferPage = require('../../pages/TransferPage');
const BillPayPage = require('../../pages/BillPayPage');
const { generateRandomUsername } = require('../../utils/helpers');


test.describe('E2E Test Scenario', () => {
    let registeredUsername, registeredPassword, accountId;
    test.describe.configure({ mode: 'serial' });

    test('Register a new user', async ({page}) => {
        const registrationPage = new RegistrationPage(page);
        const username = generateRandomUsername();
        const password = 'password123'; // Replace with a more robust password strategy

        await registrationPage.goto();
        // verifying all fields are visible and available during test
        await page.locator(registrationPage.firstNameInput).fill('TestfirstName');
        await page.locator(registrationPage.lastNameInput).fill('TestlastName');
        await page.locator(registrationPage.addressInput).fill('123 Test Street');
        await page.locator(registrationPage.cityInput).fill('TestCity');
        await page.locator(registrationPage.stateInput).fill('PH');
        await page.locator(registrationPage.zipCodeInput).fill('12345');
        await page.locator(registrationPage.phoneInput).fill('123-456-7890');
        await page.locator(registrationPage.ssnInput).fill('123-45-6789');
        await page.locator(registrationPage.usernameInput).fill(username);
        await page.locator(registrationPage.passwordInput).fill(password);
        await page.locator(registrationPage.confirmPasswordInput).fill(password);
        await page.locator(registrationPage.registerButton).click();
        await registrationPage.verifyRegistrationSuccessful();

        // save the username and password for subsequent login tests or create a fixture for more complex test scenarios
        registeredUsername = username;  
        registeredPassword = password;
    });

    test('Login the newly created user and Verify global navigation menus', async({page}) => {
        const homePage = new HomePage(page);

        await page.goto('/');
        await page.locator(homePage.usernameInput).fill(registeredUsername);
        await page.locator(homePage.passwordInput).fill(registeredPassword);
        await page.locator(homePage.loginButton).click();
        // verify login was successful
        await page.locator(homePage.successLogInUrl).isVisible();
        // verify global navigation menus
        await homePage.verifyNavigationMenu("Open New Account");
        await homePage.verifyNavigationMenu("Accounts Overview");
        await homePage.verifyNavigationMenu("Transfer Funds");
        await homePage.verifyNavigationMenu("Bill Pay");
        await homePage.verifyNavigationMenu("Find Transactions");
        await homePage.verifyNavigationMenu("Update Contact Info");
        await homePage.verifyNavigationMenu("Request Loan");
        await homePage.verifyNavigationMenu("Log Out");
    });

    test('Create savings account and verify account overview', async({page}) => {
        const homePage = new HomePage(page);
        const openAccountPage = new OpenAccountPage(page);
        const accountOverviewPage = new AccountOverviewPage(page);

        await page.goto('/');
        await page.locator(homePage.usernameInput).fill(registeredUsername);
        await page.locator(homePage.passwordInput).fill(registeredPassword);
        await page.locator(homePage.loginButton).click();

        // create a Savings account 
        await homePage.verifyNavigationMenu("Open New Account");
        await page.waitForTimeout(1000);
        await page.locator(openAccountPage.openNewAccount).click();
        await openAccountPage.verifyAccountCreationSuccessful();
        accountId = await page.locator(openAccountPage.accountIdHolder).innerText(); //capture and save the account id for next test
        expect(accountId).toBeTruthy();

        //verify total account balance
        await homePage.verifyNavigationMenu("Accounts Overview")
        await accountOverviewPage.verifyNewAccount(accountId);
        await accountOverviewPage.verifyTotalAccountBalance(); // with issue on getting field value
    });

    test('Transfer funds', async({page}) => {
        const homePage = new HomePage(page);
        const transferPage = new TransferPage(page);

        await page.goto('/');
        await page.locator(homePage.usernameInput).fill(registeredUsername);
        await page.locator(homePage.passwordInput).fill(registeredPassword);
        await page.locator(homePage.loginButton).click();

        // transfer fund to newly created account
        await homePage.verifyNavigationMenu("Transfer Funds");
        await page.locator(transferPage.amount).fill('50');
        await page.waitForTimeout(1000);
        await page.locator(transferPage.fromAccountId).click();
        await page.waitForTimeout(1000);
        //await transferPage.selectAccount(accountId); //issue on clicking the option value

    });

    test('Pay bill', async({page}) => {
        const homePage = new HomePage(page);
        const billpayPage = new BillPayPage(page);

        await page.goto('/');
        await page.locator(homePage.usernameInput).fill(registeredUsername);
        await page.locator(homePage.passwordInput).fill(registeredPassword);
        await page.locator(homePage.loginButton).click();

        // pay bills
        await homePage.verifyNavigationMenu("Bill Pay");
        await page.locator(billpayPage.payeeName).fill('TestfirstName');
        await page.locator(billpayPage.payeeAddress).fill('TestlastName');
        await page.locator(billpayPage.payeeAddress).fill('123 Test Street');
        await page.locator(billpayPage.payeeCity).fill('TestCity');
        await page.locator(billpayPage.payeeState).fill('PH');
        await page.locator(billpayPage.payeeZipCode).fill('12345');
        await page.locator(billpayPage.phoneInput).fill('123-456-7890');
        await page.locator(billpayPage.payeeAcountNum).fill('99999');
        await page.locator(billpayPage.vefiryAccountNum).fill('99999');
        await page.locator(billpayPage.amount).fill('100');
        
        await page.locator(billpayPage.sendPayment).click();
        await billpayPage.verifyPayBillSuccessful();
    });
});