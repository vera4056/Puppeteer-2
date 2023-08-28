const {Given, When, Then, Before, After} = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { putText, getText, clickElement } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given('user is on {string} page', {timeout: 6000 }, async function (string) {
  return await this.page.goto('http://qamid.tmweb.ru/client/index.php${string}', { timeout: 6000});
});
When('user chooses {int} day of show', async function (int) { 
  await clickElement(this.page, "a.page-nav__day:nth-child(${int})");
});
And('user chooses {string} show time', async function (string) {
  await clickElement(this.page, string);
});
When('user selects seat {int} in the row {int}', async function (int, int2) {
  await clickElement(this.page, ".buying-scheme__row.buying-scheme__chair:nth-child(${int, int2})");
  });
And('user clicks {string} submit button', async function (string) {
    await clickElement(this.page, ".acceptin-button", string);
  });
Then('users sees a header {string}', async function (string) {
   const actual = await getText(this.page, 'h2', string);
   expect(actual).contain("Электронный билет");
  });

