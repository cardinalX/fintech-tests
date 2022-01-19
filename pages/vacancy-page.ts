import { BasePage } from "./base-page";
import { expect, Locator, Page } from "@playwright/test";
import { CommonLocators } from "../locators";

export class VacancyPage extends BasePage {
  PATHNAME: string;
  /**
   * @summary Кнопка Откликнуться на вакансию
   */
  readonly buttonRespondVacancy: Locator;
  /**
   * @summary Кнопка вызова меню с другими вакансиями
   */
  readonly buttonMoreVacanciesMenu: Locator;
  /**
   * @summary Кнопка включения/выключения звука
   */
  readonly buttonMute: Locator;
  /**
   * @summary Заголовки Основных блоков с инфой. "что ждет", "что предлагаем"
   */
  readonly blockHeader2: Locator;
  /**
   * @summary Основные блоки Главной страницы с инфой
   */
  readonly block: Locator;
  /**
   * @summary Условие задачи
   */
  readonly taskCodeCondition: Locator;
  /**
   * @summary Описание задачи
   */
  readonly taskDescription: Locator;
  /**
   * @summary  Поле для ввода ответа
   */
  readonly answerInput: Locator;
  /**
   * @summary Кнопка для отправки ответа
   */
  readonly buttonSendAnswer: Locator;
  /**
   * @summary Кнопка для отправки ответа
   */
  readonly buttonGoToMain: Locator;

  constructor(page: Page, pathname = '') {
    super(page);
    this.buttonMoreVacanciesMenu = this.locator('bg-accent:has-text("Еще вакансии")');
    this.buttonRespondVacancy = this.locator('//button/following-sibling::button[text() = "Откликнуться"]');
    this.buttonMute = this.buttonRespondVacancy.locator("//preceding-sibling::button");
    this.block = this.locator('.vacancy-block');
    this.blockHeader2 = this.block.locator(CommonLocators.BLOCK_H2);
    this.taskCodeCondition = this.block.locator('pre');
    this.taskDescription = this.locator('//h2/following-sibling::div/p[2]')
    this.answerInput = this.block.locator('input');
    this.buttonSendAnswer = this.answerInput.locator('//following-sibling::div');
    this.PATHNAME = pathname;
  }

  /**
   * @summary Проверка видимости всех текстовых блоков
   */
  async shouldBeVisibleTextBlocks(): Promise<void> {
    for (let index = 0; index < 4; index++) {
      await this.blockText.nth(index).isVisible();
    }
  }
  /**
   * @summary Проверка видимости всех заголовков с текстом
   */
  async shouldBeVisibleHeaders(): Promise<void> {
    for (let index = 0; index < 4; index++) {
      await this.blockHeader2.nth(index).isVisible();
    }
  }
}
