import { expect } from "@playwright/test";
import { VacancyPage } from "../../pages/vacancy-page";
import { test } from "../../fixtures/main-fixture";

test.describe('Медиаконтент на странице вакансии "Автоматизация тестирования" @media', async () => {
  const vacancyPathname = 'auto-test';

  test("Вкл звука нажатием на кнопку @unmute", async ({ page }) => {
    const vacancyPage = new VacancyPage(page, vacancyPathname);

    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
    });

    await test.step("Проверка, что в видео отключен звук (до нажатия кнопки)", async () => {
      expect(await vacancyPage.page.$eval<boolean, HTMLVideoElement>('#video', node => node.muted)).toBeTruthy();
    });

    await test.step("Нажатие на кнопку Unmute", async () => {
      await vacancyPage.buttonMute.click();
    });

    await test.step("Проверка, чтобы в видео включился звук", async () => {
      expect(await vacancyPage.page.$eval<boolean, HTMLVideoElement>('#video', node => node.muted)).toBeFalsy();
    });
  });

  test("Проверка авто-воспроизведения видео @autoplay", async ({ page }) => {
    const vacancyPage = new VacancyPage(page, vacancyPathname);

    await test.step("Открытие страницы вакансии Автоматизация тестирования", async () => {
      await vacancyPage.goto();
    });

    await test.step("Проверка, что видео автоматически воспроизводится", async () => {
      expect(await page.$eval<boolean, HTMLVideoElement>('#video', node => node.paused)).toBeFalsy();
    });
  });

  test("Проверка авто-воспроизведения видео и звука после перехода с главной @autoplay", async ({
    mainPage
  }) => {
    const vacancyPage = new VacancyPage(mainPage.page, vacancyPathname);

    await test.step("Проверка, что видео автоматически воспроизводится", async () => {
      expect(await vacancyPage.page.$eval<boolean, HTMLVideoElement>('#video', node => node.paused)).toBeFalsy();
    });
    await test.step("Проверка, что Звук автоматически воспроизводится", async () => {
      expect(await vacancyPage.page.$eval<boolean, HTMLVideoElement>('#video', node => node.muted)).toBeFalsy();
    });
  });

});
