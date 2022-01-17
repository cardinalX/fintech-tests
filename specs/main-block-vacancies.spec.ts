import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main-page";

test.describe("Список вакансий в блоке @list-vacancies", async () => {

  test('Открытие меню вакансий и переход на страницу вакансии "Автоматизация тестирования"', async ({ page }) => {
    test.skip();
  });

  test('Открытие меню вакансий и переход на страницу первой вакансии "DevOps-инженер"', async ({ page }) => {
    test.skip();
  });

  test('Открытие меню вакансий и переход на страницу "Другие вакансии"', async ({ page }) => {
    test.skip();
  });

  //TODO: BUG:
  test('[BUG] Перейти на вакансию и сразу нажать на ссылку в шапке.', async ({ page }) => {
    test.skip();
    // Откроется битая страница, нужно проверять URL открытой страницы
  });
});
