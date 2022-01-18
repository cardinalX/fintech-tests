import { expect, Page, Response } from "@playwright/test";
import { MainPage } from "../../pages/main-page";
import listVacancies from "../../data/listVacancies.json";
import { test } from "../../fixtures/main-fixture";

test.describe("Меню с вакансиями @menu", async () => {

  test("Открытие меню с вакансиями и закрытие. Проверка, что меню исчезло", async ({
    mainPage,
  }) => {
    await test.step("Открытие меню с вакансиями", async () => {
      await mainPage.buttonVacanciesMenu.click();
    });

    await test.step(
      "Проверка, что появились элементы меню(вакансии)",
      async () => {
        await expect(mainPage.vacanciesMenuContainer).toBeVisible();
        await expect(mainPage.vacanciesMenuItems.first()).toBeVisible();
        await expect(mainPage.vacanciesMenuItems.last()).toBeVisible();
        // +1 т.к. есть еще "Другие вакансии"
        expect(await mainPage.vacanciesMenuItems.count()).toEqual(listVacancies.length + 1);
      }
    );

    await test.step("Закрытие меню с вакансиями", async () => {
      await mainPage.buttonCloseMenu.click();
    });

    await test.step(
      "Проверка, что элементов меню теперь не видно",
      async () => {
        await expect(mainPage.vacanciesMenuContainer).toBeHidden();
        await expect(mainPage.vacanciesMenuItems.last()).toBeHidden();
      }
    );
  });

  test('Открытие меню вакансий и переход на страницу вакансии "Автоматизация тестирования"', async ({ mainPage, baseURL }) => {
    await mainPage.buttonVacanciesMenu.click();
    await mainPage.vacanciesMenuItemByHref(baseURL + "/auto-test").click();
    // TODO: проверки overview страницы с Вакансиями
  });

  test('Открытие меню вакансий и переход по первой вакансии', async ({ mainPage }) => {
    await mainPage.buttonVacanciesMenu.click();
    await mainPage.vacanciesMenuItems.first().click();
    // TODO: проверки overview страницы с Вакансиями
  });

  test('Открытие меню вакансий и переход по последней ссылке "Другие вакансии"', async ({ mainPage, context }) => {
    await mainPage.buttonVacanciesMenu.click();

    const expectedURL =
      "https://yandex.ru/jobs/services/finances/?utm_source=finpromoland";
    const stepDesc = 'последний элемент в меню: "Другие вакансии"';
    await mainPage.clickAndCheckNewPageResponse(context, expectedURL, mainPage.vacanciesMenuItems.last(), stepDesc);
  });
});

