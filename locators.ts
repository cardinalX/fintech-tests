// Перечисления со статичными константами для хранения Локаторов в едином месте

/**
 * @summary Общие локаторы на большинстве типов страниц.
 */
export enum CommonLocators {
  /**
   * @description Ссылка-Лого в шапке
   */
  HEADER_LOGO_LINK = 'header a.logo',
  /**
   * @description Ссылка-Лого в шапке
   */
  FOOTER_LOGO_LINK = 'footer a',
}

/**
 * @summary Локаторы для Главной страницы
 */
 export enum MainPageLocators {
  /**
   * @description Кнопка наши вакансии Desktop
   */
  BUTTON_VACANCIES_MENU = '.content button:has-text("Наши вакансии")',

  /**
   * @description Элементы вакансий(текстовые) в меню
   */
  VACANCIES_MENU_ITEM = 'a .vacancies-menu-item',
  VACANCIES_MENU = '.vacancies-menu',
  BUTTON_CLOSE_MENU = '.vacancies-menu button:has-text("Закрыть")',
}
