import { test, expect } from "@playwright/test";
import { VacancyPage } from "../../pages/vacancy-page";

test.describe('Отклик на вакансию', async () => {

  test('Проверка кнопки "Откликнуться"(скролл)', async ({ page }) => {
    test.skip();
  });

  test('Отправка Корректного ответа в задаче и редирект на телеграм', async ({ page }) => {
    test.skip();
  });

  test('Отправка Некорректного ответа в задаче и появление сообщения об этом.', async ({ page }) => {
    test.skip();
  });

  test('Нажатие отправить с пустым ответом. Нет редиректов. Кнопка не нажимается.', async ({ page }) => {
    test.skip();
  });
});
