const {Given, When, Then, Before, After} = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { putText, getText } = require("../../lib/commands.js");

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
When('user chooses {string} day of show', async function (string) {
  return await putText(page, "a.page-nav__day:nth-child(3)", string);
});
And('user chooses {string} show time', async function (string) {
  return await putText(page, "a.movie-seances__time", string);
});
And('user selects seat {int} in the row {int}', async function (int, int2) {
  int = 3;
  int2 = 3; 
  return await getText(page, ".buying-scheme", int, int2);
  });
  
And('user clicks {string}', async function (string) {
    return await getText(page, ".buying-scheme", string);
  });
And('user clicks {string}', async function (string) {
    return await getText(page, ".buying-scheme", string);
  });

Then('users sees a header {"Электронный билет"}', async function (string) {
   const actual = await getText(page, 'h2', string);
   expect(actual).contain("Электронный билет");
  });
