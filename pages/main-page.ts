import { BasePage } from './base-page';
import { MainPageLocators } from '../locators';
import { Locator, Page } from '@playwright/test';

export class MainPage extends BasePage {
  readonly PATHNAME: string = '';

  /**
   * @summary Кнопка меню с вакансиями
   */
  readonly buttonVacanciesMenu: Locator;
  /**
   * @summary Элементы вакансий(текстовые) в меню
   */
  readonly vacanciesMenuItem: Locator;
  readonly vacanciesMenu: Locator;
  /**
   * @summary кнопка закрытия меню с вакансиями
   */
  readonly buttonCloseMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.buttonVacanciesMenu = this.locator(MainPageLocators.BUTTON_VACANCIES_MENU);
    this.vacanciesMenuItem = this.locator(MainPageLocators.VACANCIES_MENU_ITEM);
    this.vacanciesMenu = this.locator(MainPageLocators.VACANCIES_MENU);
    this.buttonCloseMenu = this.locator(MainPageLocators.BUTTON_CLOSE_MENU);
  }
}
