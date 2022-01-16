import { test, expect, Page, Response } from "@playwright/test";
import { CommonLocators } from "../locators";
import { MainPage } from "../pages/main-page";
import { EventEmitter } from "events";

test("Главная страница. Включение звука нажатием на кнопку @unmute", async ({
  page,
}) => {
  const mainPage = new MainPage(page);

  await test.step("Открытие главной страницы", async () => {
    await mainPage.goto();
  });

  await test.step("Проверка, что в видео отключен звук (до нажатия кнопки)", async () => {
    expect(await page.$eval('#video', node => node.muted)).toBeTruthy();
  });

  await test.step("Нажатие на кнопку Unmute", async () => {
    await mainPage.buttonMute.click();
  });

  await test.step("Проверка, чтобы в видео включился звук", async () => {
    expect(await page.$eval('#video', node => node.muted)).toBeFalsy();
  });
});
