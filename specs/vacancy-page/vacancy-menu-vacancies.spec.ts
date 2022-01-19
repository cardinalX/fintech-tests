import { test, expect } from "@playwright/test";
import { VacancyPage } from "../../pages/vacancy-page";
import listVacancies from "../../data/listVacancies.json";

test.describe('Страница вакансии Автоматизация тестирования. Меню "Еще вакансии" @menu', async () => {
  const vacancyPathname = 'auto-test';
  test("Открытие меню с вакансиями и закрытие с проверкой исчезновения", async ({ page }) => {
    const vacancyPage = new VacancyPage(page, vacancyPathname);

    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
    });

    await test.step("Открытие меню с вакансиями", async () => {
      await vacancyPage.buttonMoreVacanciesMenu.click();
    });

    await test.step(
      "Проверка, что появились элементы меню(вакансии)",
      async () => {
        await expect(vacancyPage.vacanciesMenuContainer).toBeVisible();
        await expect(vacancyPage.vacanciesMenuItems.first()).toBeVisible();
        await expect(vacancyPage.vacanciesMenuItems.last()).toBeVisible();
        // +1 т.к. есть еще "Другие вакансии"
        expect(await vacancyPage.vacanciesMenuItems.count()).toEqual(
          listVacancies.length + 1
        );
      }
    );

    await test.step("Закрытие меню с вакансиями", async () => {
      await vacancyPage.buttonCloseMenu.click();
    });

    await test.step(
      "Проверка, что элементов меню теперь не видно",
      async () => {
        await expect(vacancyPage.vacanciesMenuContainer).toBeHidden();
        await expect(vacancyPage.vacanciesMenuItems.last()).toBeHidden();
      }
    );
  });

  test('Открытие меню вакансий и переход на страницу вакансии "Автоматизация тестирования"', async ({ page }) => {
    test.skip();
  });

  test('Открытие меню вакансий и переход на страницу первой вакансии "DevOps-инженер"', async ({ page }) => {
    test.skip();
  });

  test('Открытие меню вакансий и переход на страницу "Другие вакансии"', async ({ page }) => {
    test.skip();
  });
});

