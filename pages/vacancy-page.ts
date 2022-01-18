import { BasePage } from "./base-page";
import { Locator, Page } from "@playwright/test";

export class VacancyPage extends BasePage {
  readonly PATHNAME: string = "";
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

  constructor(page: Page) {
    super(page);
    this.buttonMoreVacanciesMenu = this.locator(
      'bg-accent:has-text("Еще вакансии")'
    );
    this.buttonRespondVacancy = this.locator('//button/following-sibling::button[text() = "Откликнуться"]');
    this.buttonMute = this.buttonRespondVacancy.locator("//preceding-sibling::button");
  }
}
