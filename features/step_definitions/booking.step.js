const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { getText, clickElement } = require("../../lib/commands.js");

setDefaultTimeout(70000);

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

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru${string}`, {
    setTimeout: 20000,
  });
});

When("user selects the next day", async function () {
  await clickElement(this.page, ".page-nav__day:not(.page-nav__day_today)");
});

When("user chooses the movie seance with modern hall", async function () {
  await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='225']",
  );
});

When("user books one VIP seat", async function () {
  await clickElement(this.page, "div:nth-child(10) span:nth-child(2)");
});

When("user click on button {string}", async function (string) {
  const btnSelector = ".acceptin-button";
  await this.page.waitForSelector(btnSelector, {
    visible: true,
    timeout: 20000,
  });
  await clickElement(this.page, btnSelector);
});

When("user chooses the standart hall", async function () {
  await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='217']",
  );
});

When("user books two standard seats", async function () {
  const standartSeatSelector =
    ".buying-scheme__chair.buying-scheme__chair_standart";
  const row3seat3 = "div:nth-child(3) span:nth-child(3)";
  const row3seat4 = "div:nth-child(3) span:nth-child(4)";
  await this.page.waitForSelector(standartSeatSelector, {
    visible: true,
    timeout: 15000,
  });
  await clickElement(this.page, row3seat3);
  await clickElement(this.page, row3seat4);
});

When("user trys to book a taken seat", async function () {
  const takenSeatSelector =
    ".buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken";
  await this.page.waitForSelector(takenSeatSelector, {
    visible: true,
    timeout: 15000,
  });
  await clickElement(this.page, takenSeatSelector);
});

Then("user should see confirmation {string}", async function (expected) {
  const checkTitleSelector = ".ticket__check-title";
  await this.page.waitForSelector(checkTitleSelector, {
    visible: true,
    timeout: 30000,
  });
  const actual = await getText(this.page, checkTitleSelector);
  chai.expect(actual).to.equal(expected);
});

Then("the {string} button should be disabled", async function (string) {
  const btnSelector = ".acceptin-button";
  await this.page.waitForSelector(btnSelector, {
    visible: true,
    timeout: 20000,
  });
  const buttonStatus = await this.page.$eval(
    btnSelector,
    (btn) => btn.disabled,
  );

  expect(buttonStatus).to.equal(true);
});
