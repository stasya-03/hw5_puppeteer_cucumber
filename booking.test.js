const { clickElement, getText } = require("./lib/commands");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php", { timeout: 0 });
});

afterEach(() => {
  page.close();
});

describe("Booking tickets tests", () => {

  test("Successful booking of one VIP seat on the next day", async () => {

    const expected = "Вы выбрали билеты:";
    const vipSeatSelector = "div:nth-child(10) span:nth-child(2)";
    const checkTitleSelector = ".ticket__check-title";
    const btnSelector = ".acceptin-button";

    await clickElement(page, ".page-nav__day:not(.page-nav__day_today)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='225']",
    );
    await page.waitForSelector(vipSeatSelector, {
      visible: true,
      timeout: 15000,
    });
    await clickElement(page, vipSeatSelector);
    await page.waitForSelector(btnSelector, { visible: true, timeout: 20000 });
    await clickElement(page, btnSelector);
    await page.waitForSelector(checkTitleSelector, {
      visible: true,
      timeout: 30000,
    });

    const actual = await getText(page, checkTitleSelector);

    expect(actual).toEqual(expected);
  });

  test("Successful booking of two standart seats on the next day", async () => {

    const expected = "Вы выбрали билеты:";
    const standartSeatSelector = ".buying-scheme__chair.buying-scheme__chair_standart";
    const row3seat3 = "div:nth-child(3) span:nth-child(3)";
    const row3seat4 = "div:nth-child(3) span:nth-child(4)";
    const checkTitleSelector = ".ticket__check-title";
    const btnSelector = ".acceptin-button";

    await clickElement(page, ".page-nav__day:not(.page-nav__day_today)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']",
    );
    await page.waitForSelector(standartSeatSelector, {
      visible: true,
      timeout: 15000,
    });
    await clickElement(page, row3seat3);
    await clickElement(page, row3seat4);
    await page.waitForSelector(btnSelector, { visible: true, timeout: 20000 });
    await clickElement(page, btnSelector);
    await page.waitForSelector(checkTitleSelector, {
      visible: true,
      timeout: 30000,
    });

    const actual = await getText(page, checkTitleSelector);

    expect(actual).toEqual(expected);
  });

  test("Unsuccessful booking of an taken seat", async () => {

    const takenSeatSelector = ".buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken";
    const btnSelector = ".acceptin-button";

    await clickElement(page, ".page-nav__day:not(.page-nav__day_today)");
    await clickElement(
      page,
      ".movie-seances__time[href='#'][data-seance-id='217']",
    );
    await page.waitForSelector(takenSeatSelector, {
      visible: true,
      timeout: 15000,
    });
    await clickElement(page, takenSeatSelector);
    await page.waitForSelector(btnSelector, { visible: true, timeout: 20000 });
    const buttonStatus = await page.$eval(btnSelector, (btn) => btn.disabled);

    expect(buttonStatus).toBe(true);
  });
});
