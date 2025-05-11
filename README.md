# Playwright Test Automation

This repository contains sample Playwright test scripts for end-to-end testing of a web application.

## Prerequisites

* Node.js installed
* Playwright installed globally using npm i -g playwright

## Cloning the Repository

To get a copy of this repository, run the following command:
`git clone https://github.com/your-username/playwright-test-automation.git`

**Running Tests**
* To run all tests, navigate to the project directory and execute the following command:
  
`npx playwright test`

* To run a specific test file, replace <test-file> with the path to the test file and execute the following command:
`npx playwright test <test-file>`

For example, to run the registration.spec.js test file, execute the following command:

`npx playwright test tests/ui/registration.spec.js`

**Viewing HTML Report**
After running the tests, an HTML report will be generated in the playwright-report directory. To view the report, navigate to the project directory and execute the following command:

`npx playwright show-report`

This will open the HTML report in your default web browser.
