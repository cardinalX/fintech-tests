import { BasePage } from './base-page';
import { CommonLocators } from '../locators';
import { Locator, Page } from '@playwright/test';

export class MainPage extends BasePage {
  readonly PATHNAME: string = '';
  /**
   * @summary Кнопка вызова меню с вакансиями
   */
  readonly buttonVacanciesMenu: Locator;
  /**
   * @summary Кнопка включения/выключения звука
   */
  readonly buttonMute: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonVacanciesMenu = this.locator(CommonLocators.BUTTON_VACANCIES_MENU);
    this.buttonMute = this.buttonVacanciesMenu.locator('..').locator('//following-sibling::button');
  }
}
