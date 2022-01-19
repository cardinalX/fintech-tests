import { expect } from "@playwright/test";
import { test } from "../../fixtures/main-fixture";

test.describe('Медиаконтент @media', async () => {
  test("Главная страница. Вкл звука нажатием на кнопку @unmute", async ({ mainPage }) => {
    await test.step("Проверка, что в видео отключен звук (до нажатия кнопки)", async () => {
      expect(await mainPage.page.$eval<boolean, HTMLVideoElement>('#video', node => node.muted)).toBeTruthy();
    });

    await test.step("Нажатие на кнопку Unmute", async () => {
      await mainPage.buttonMute.click();
    });

    await test.step("Проверка, чтобы в видео включился звук", async () => {
      expect(await mainPage.page.$eval<boolean, HTMLVideoElement>('#video', node => node.muted)).toBeFalsy();
    });
  });

  test("Главная страница. Проверка авто-воспроизведения видео @autoplay", async ({ page }) => {
    await test.step("Проверка, что видео автоматически воспроизводится", async () => {
      expect(await page.$eval<boolean, HTMLVideoElement>('#video', node => node.paused)).toBeFalsy();
    });
  });

});
