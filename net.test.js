const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("qamid.tmweb.ru tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");// перейти на сайт 
  });

  test("Should book for a ticket", async () => {
    const dayPage = await page.$(a.page-nav__day.page-nav__day_weekend.page-nav__day_chosen); // перейти на скнопку дата -конкретный день
    await dayPage.click(); // кликаем и выбираем конкретный день 
    const seanceTime = await page.$(a.movie-seances_time); // перейти на кнопку время по указанному селектору
    await seanceTime.click();
    const chairBuying = await page.$(span.buying-scheme__chair);// попадаем на страницу бронирования и находим селектор со свободным местом 
    await chairBuying.click();
    const booking ="button.acceptin-button"; // селекторы кнопки забронировать
    await page.waitForSelector(booking, {visible: true, }); // находит кнопку забронировать
    await booking.click(); // кликаем на кнопку забронировать
    const actual = await page.$eval(button.acceptin-button, link => link.textContent); // находим селектор кнопки получить код бронирования
await actual.click();
await page.waitForSelector("h2.ticket__check-title");
const title = await page.title();
    expect(title).toContain("ЭЛЕКТРОННЫЙ БИЛЕТ")
   });

   test("Should book for a ticket2", async () => {
    const dayPage = await page.$(a.page-nav__day.page-nav__day_weekend.page-nav__day_chosen); // перейти на скнопку дата -конкретный день
    await dayPage.click(); // кликаем и выбираем конкретный день 
    const seanceTime = await page.$(a.movie-seances__time.data-seance-id173); // перейти на кнопку время по указанному селектору
    await seanceTime.click();
    const chairBuying1 = await page.$(span.buying-scheme__chair.buying-scheme__chair_standart);// попадаем на страницу бронирования и находим селектор со свободным местом 
    await chairBuying1.click();
    const chairBuying2 = await page.$(span.buying-scheme__chair.buying-scheme__chair_standart);// попадаем на страницу бронирования и находим селектор со свободным местом 
    await chairBuying2.click();
    const booking ="button.acceptin-button"; // селекторы кнопки забронировать
    await page.waitForSelector(booking, {visible: true, }); // находит кнопку забронировать
    await booking.click(); // кликаем на кнопку забронировать
    const actual = await page.$eval(button.acceptin-button, link => link.textContent); // находим селектор кнопки получить код бронирования
await actual.click();
await page.waitForSelector("h2.ticket__check-title");
const title = await page.title();
    expect(title).toContain("ЭЛЕКТРОННЫЙ БИЛЕТ")
   });
  });

  describe ("Negative booking for a ticket Tests", () => {
    test("Should book for a ticket", async () => {
      const dayPage = await page.$(a.page-nav__day.page-nav__day_weekend.page-nav__day_chosen); // перейти на скнопку дата -конкретный день
      await dayPage.click(); // кликаем и выбираем конкретный день 
      const seanceTime = await page.$(a.movie-seances_time); // перейти на кнопку время по указанному селектору
      await seanceTime.click();
      const chairBuying = await page.$(span.buying-scheme__chair.buying-scheme__chair_disabled);// попадаем на страницу бронирования и находим селектор со свободным местом 
      await chairBuying.click();
      const booking ="button.acceptin-button"; // селекторы кнопки забронировать
      await page.waitForSelector(booking, {visible: false, }); // находит кнопку забронировать в неактивном состоянии
      await booking.click(); // кликаем на кнопку забронировать и ничего не происход
      const actual = await page.$eval(button.acceptin-button, link => link.textContent); // тут не должна быть заголовка - получить код бронирования
  await actual.click();
  await page.waitForSelector("h2.ticket__check-title");
  const title = await page.title();
      expect(title).toContain("ЭЛЕКТРОННЫЙ БИЛЕТ")
      });
    });