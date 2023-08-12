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
    const dayPage = await page.$("a.page-nav__day:nth-child(3)"); // перейти на скнопку дата -конкретный день
    await dayPage.click(); // кликаем и выбираем конкретный день 
    const seanceTime = await page.$("a.movie-seances__time"); // перейти на кнопку время по указанному селектору
    await seanceTime.click();
    await clickElement(page, "span.buying-scheme__chair.buying-scheme__chair_standart:nth-child(3)");
    // await putText(page, 'input[buying-scheme__chair]', generateName()
    await clickElement(page, "button.acceptin-button"); 
    await clickElement(page, "button.acceptin-button");
    const title = await getText(page, 'h2'); // хотя тут по данному селектору должен быть текст "Электронный билет", так же пробовала селектор h2.ticket__check-title, выдает онибку что `Text is not available for selector: ${selector}`
    expect(title).toContain("Электронный билет")
  });

  test("Should book for two tickets", async () => {
    const dayPage = await page.$("a.page-nav__day:nth-child(5)"); // перейти на скнопку дата -конкретный день
    await dayPage.click(); // кликаем и выбираем конкретный день 
    const seanceTime = await page.$("a.movie-seances__time"); // перейти на кнопку время по указанному селектору
    await seanceTime.click();
    await clickElement(page, "span.buying-scheme__chair.buying-scheme__chair_standart:nth-child(1)");
    await page.waitForSelector("button.acceptin-button");
    await clickElement(page, "span.buying-scheme__chair.buying-scheme__chair_standart:nth-child(5)");
    await page.waitForSelector("button.acceptin-button");
    await page.click("button.acceptin-button");
    await page.click("button.acceptin-button");
    const title = await getText(page, 'h2');
    expect(title).toContain("Электронный билет") // хотя тут по данному селектору должен быть текст "Электронный билет", так же пробовала селектор h2.ticket__check-title, выдает онибку что `Text is not available for selector: ${selector}`
    });
  
  test("Should book for a already booked ticket", async () => {
    const dayPage = await page.$("a.page-nav__day:nth-child(2)"); // перейти на скнопку дата -конкретный день
    await dayPage.click(); // кликаем и выбираем конкретный день 
    const seanceTime = await page.$("a.movie-seances__time"); // перейти на кнопку время по указанному селектору
    await seanceTime.click();
    await clickElement(page,"span.buying-scheme__chair.buying-scheme__chair_taken");// попадаем на страницу бронирования и находим селектор с занятым местом, например ряд 7/6 место
    await page.waitForSelector("button.acceptin-button");
    await page.click("button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const error = await getText(page, 'button.acceptin-button'); // тут как бы ничего не происходит, КНОПКА не активна
    expect(error).toContain("Забронировать");
    });
  }); 