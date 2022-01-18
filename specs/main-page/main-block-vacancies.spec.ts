import { expect, Page, Response } from "@playwright/test";
import { test } from "../../fixtures/main-fixture";
import { VacancyPage } from "../../pages/vacancy-page";

test.describe("Список вакансий в блоке @list-vacancies", async () => {

  test('Переход на страницу вакансии "Автоматизация тестирования" из списка вакансий', async ({ mainPage, baseURL }) => {
    const vacancyPathname = baseURL + '/auto-test';
    await mainPage.linkVacancyInBlockByHref(vacancyPathname).click();
    const vacancyPage = new VacancyPage(mainPage.page);
    await expect(vacancyPage.firstBlockHeader).toContainText("Инженер по автоматизации тестирования");
    await expect(vacancyPage.firstBlockHeader).toBeVisible();
    //TODO: проверки overview страницы с Вакансиями
  });

  test('Переход на первую вакансию из блока со списком вакансий', async ({ mainPage }) => {
    await mainPage.linksVacancyInBlock.first().click();
    const vacancyPage = new VacancyPage(mainPage.page);
    await vacancyPage.page.waitForURL('**://**\/**');
    expect((await vacancyPage.firstBlockHeader.textContent()).length).toBeGreaterThanOrEqual(10);
    await expect(vacancyPage.firstBlockHeader).toBeVisible();
    //TODO: проверки overview страницы с Вакансиями
  });

  test('Переход по ссылке "Другие вакансии" из блока со списком вакансий', async ({ mainPage, context }) => {
    const expectedURL =
      "https://yandex.ru/jobs/services/finances/?utm_source=finpromoland";
    const stepDesc = 'последнюю ссылку в блоке со списком вакансий';
    await mainPage.clickAndCheckNewPageResponse(context, expectedURL, mainPage.linkAnotherVacancies, stepDesc);
  });

});