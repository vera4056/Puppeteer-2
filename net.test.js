const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("http://qamid.tmweb.ru/client/index.php");// перейти на сайт 
});

afterEach(() => {
  page.close();
});

describe("qamid.tmweb.ru tests", () => {
  test("Should book for a ticket", async () => {
    const dayPage = await page.$("a.page-nav__day:nth-child(2)"); // перейти на скнопку дата -конкретный день
    await dayPage.click(); // кликаем и выбираем конкретный день 
    const seanceTime = await page.$("a.movie-seances__time"); // перейти на кнопку время по указанному селектору
    await seanceTime.click();
    const chairBuying = await page.$("span.buying-scheme__chair.buying-scheme__chair_standart:nth-child(8)"); // попадаем на страницу бронирования и находим селектор со свободным местом 
    await clickElement(page, chairBuying);
    await clickElement(page, "button.acceptin-button"); // находит кнопку -забронировать и кликает на нее
    const getBooking = await page.$("button.acceptin-button");// получить код бронирования
    await clickElement(page, getBooking);
    const title = await getText(page, 'h2');
    expect(title).toContain("ЭЛЕКТРОННЫЙ БИЛЕТ")
  });

  test("Should book for two tickets", async () => {
    const dayPage = await page.$("a.page-nav__day:nth-child(2)"); // перейти на скнопку дата -конкретный день
    await dayPage.click(); // кликаем и выбираем конкретный день 
    const seanceTime = await page.$("a.movie-seances__time"); // перейти на кнопку время по указанному селектору
    await seanceTime.click();
    const chairBuying1 = await page.$("div.span.buying-scheme__chair.buying-scheme__chair_vip.div:nth-child(8).span:nth-child(7)"); // попадаем на страницу бронирования и находим селектор со свободным местом 
    await clickElement(page, chairBuying1);
    const chairBuying2 = await page.$("div.span.buying-scheme__chair.buying-scheme__chair_standart.div:nth-child(8).span:nth-child(8)"); // попадаем на страницу бронирования и находим селектор со свободным местом 
    await clickElement(page, chairBuying2);
    await clickElement(page, "button.acceptin-button");
    const getBooking = await page.$("button.acceptin-button");// получить код бронирования
    await clickElement(page, getBooking);
    const title = await getText(page, 'h2');
    expect(title).toContain("ЭЛЕКТРОННЫЙ БИЛЕТ")
    });
  
  test("Should book for a already booked ticket", async () => {
    const dayPage = await page.$("a.page-nav__day:nth-child(2)"); // перейти на скнопку дата -конкретный день
    await dayPage.click(); // кликаем и выбираем конкретный день 
    const seanceTime = await page.$("a.movie-seances__time"); // перейти на кнопку время по указанному селектору
    await seanceTime.click();
    const chairBuying = await page.$("span.buying-scheme__chair.buying-scheme__chair_disabled");// попадаем на страницу бронирования и находим селектор с занятым местом, например ряд 7/6 место
    await clickElement(page, chairBuying);
    const getBooking = await page.$("button.acceptin-button");
    await clickElement(page, getBooking);
    const error = await page.$("button.acceptin-button"); // тут как бы ничего не происходит, КНОПКА не активна
    expect(error).toContain(`Selector is not clickable: ${getBooking}`);
    });
  }); 