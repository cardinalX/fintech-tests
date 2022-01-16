import { test, expect, Page, Response } from "@playwright/test";
import { MainPage } from "../pages/main-page";

test.describe('Медиаконтент @media', async () => {
  test("Главная страница. Вкл звука нажатием на кнопку @unmute", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);

    await test.step("Открытие главной страницы", async () => {
      await mainPage.goto();
    });

    await test.step("Проверка, что в видео отключен звук (до нажатия кнопки)", async () => {
      expect(await page.$eval('#video', node => node.muted)).toBeTruthy();
    });

    // let haveEvent = false;
    await test.step("Нажатие на кнопку Unmute", async () => {
      await mainPage.buttonMute.click();
      // const myEmitter = new EventEmitter();
      // myEmitter.once("video:unmute", (event, unmute) => {
      //   if (event === "video:unmute") {
      //     haveEvent = true;
      //   }
      // });
      // await mainPage.buttonMute.click();

      // [] = await Promise.all([
      //   myEmitter.once("video:unmute", (event, unmute) => {
      //     if (event === "video:unmute") {
      //       haveEvent = true;
      //     }
      //   }),
      //   mainPage.buttonMute.click(),
      // ]);
    });

    await test.step("Проверка, чтобы в видео включился звук", async () => {
      expect(await page.$eval('#video', node => node.muted)).toBeFalsy();
    });
  });

  test("Главная страница. Проверка авто-воспроизведения видео @autoplay", async ({
    page,
  }) => {
    const mainPage = new MainPage(page);

    await test.step("Открытие главной страницы", async () => {
      await mainPage.goto();
    });

    await test.step("Проверка, что видео автоматически воспроизводится", async () => {
      expect(await page.$eval('#video', node => node.played)).toBeTruthy();
    });
  });

});
