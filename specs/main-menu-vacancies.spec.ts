import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main-page";

test.describe("Меню с вакансиями @menu", async () => {
  test("Открытие меню с вакансиями и закрытие. Проверка, что меню исчезло", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);

    await test.step("Открытие главной страницы", async () => {
      await mainPage.goto();
    });

    await test.step("Открытие меню с вакансиями", async () => {
      await mainPage.buttonVacanciesMenu.click();
    });

    await test.step(
      "Проверка, что появились элементы меню(вакансии)",
      async () => {
        await expect(mainPage.vacanciesMenu).toBeVisible();
        await expect(mainPage.vacanciesMenuItem.first()).toBeVisible();
        await expect(mainPage.vacanciesMenuItem.last()).toBeVisible();
        expect(await mainPage.vacanciesMenuItem.count()).toBeGreaterThanOrEqual(
          5
        );
      }
    );

    await test.step("Закрытие меню с вакансиями", async () => {
      await mainPage.buttonCloseMenu.click();
    });

    await test.step(
      "Проверка, что элементов меню теперь не видно",
      async () => {
        await expect(mainPage.vacanciesMenu).toBeHidden();
        await expect(mainPage.vacanciesMenuItem.last()).toBeHidden();
      }
    );
  });
});

//TODO: BUG: Перейти на страницу вакансии и сразу нажать на ссылку в шапке, откроется битая страница, нужно проверять URL открытой страницы
