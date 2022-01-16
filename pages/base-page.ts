import test, {
  BrowserContext,
  expect,
  Locator,
  Page,
  Response,
} from "@playwright/test";
import { CommonLocators } from "../locators";

/**
 * @summary Базовый класс паттерна PageObject.
 * @description Упрощает работы со страницами,
 * предоставляя общие переиспользуемые действия над страницей и проверки.
 * Хранит pathname страницы, заголовок и объект page(из playwright) для управления страницей.
 */
export abstract class BasePage {
  readonly page: Page;
  abstract readonly PATHNAME: string;
  readonly expectedTitle: string | RegExp;

  // Common Locators
  /**
   * @summary Ссылка-Лого в шапке
   */
  readonly headerLogoLink: Locator;
  /**
   * @summary Ссылка-Лого в шапке
   */
  readonly footerQuestionsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.expectedTitle = "Создавайте Финтех с нуля";
    this.headerLogoLink = page.locator(CommonLocators.HEADER_LOGO_LINK);
    this.footerQuestionsLink = page.locator(CommonLocators.FOOTER_LOGO_LINK);
  }

  /**
   * @summary Переход на страницу данного класса.
   * @description URL составляется из baseURL(playwright.config.ts) + PATHNAME(из текущего класса)
   */
  async goto(option?: {
    waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
  }): Promise<void> {
    await this.page.goto(this.PATHNAME, option);
  }

  /**
   * @summary Метод page.locator из Playwright. Обертка для сокращения кода
   * @description
   * The method returns an element locator that can be used to perform actions on the page. Locator is resolved to the
   * element immediately before performing an action, so a series of actions on the same locator can in fact be performed on
   * different DOM elements. That would happen if the DOM structure between those actions has changed.
   *
   * Note that locator always implies visibility, so it will always be locating visible elements.
   *
   * Shortcut for main frame's [frame.locator(selector)](https://playwright.dev/docs/api/class-frame#frame-locator).
   * @param selector A selector to use when resolving DOM element. See [working with selectors](https://playwright.dev/docs/selectors) for more details.
   */
  locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * @summary Проверка на соответствие открытого URL с URL данной страницы.
   * Ожидает некоторое время(дефолтное), совпадения URL.
   * @param baseURL значение baseURL, можно получить из теста. Хранится в playwright.config.ts
   */
  async shouldBeCorrectUrl(baseURL: string): Promise<void> {
    const expectedURL = new URL(this.PATHNAME, baseURL).href;
    await expect(this.page).toHaveURL(expectedURL);
  }

  /**
   * @summary Нажатие на логотип в шапке и проверка открытия новой вкладки с вакансиями.
   * Проверяется открытый url и HTTP ответ сервера.
   * @param context объект текущего браузерного контекста
   */
  async clickLogoAndCheckPageResponse(context: BrowserContext): Promise<void> {
    const expectedURL =
      "https://yandex.ru/jobs/services/finances/?utm_source=finpromoland";
    let pageYandexJobs: Page;
    let responsePageYandex: Response;
    await test.step(`Нажатие на логотип "Яндекс" в шапке`, async () => {
      [pageYandexJobs, responsePageYandex] = await Promise.all([
        context.waitForEvent("page"),
        context.waitForEvent(
          "response",
          (response) => response.url() === expectedURL
        ),
        this.headerLogoLink.click(),
      ]);
    });

    await test.step(
      `Проверка, что открылся верный URL=${expectedURL} в новой вкладке`,
      async () => {
        await expect(pageYandexJobs).toHaveURL(expectedURL);
      }
    );

    await test.step(
      "Проверка, что в новой вкладке ответ HTTP был с кодом 200-299",
      async () => {
        expect(responsePageYandex.ok()).toEqual(true);
      }
    );
  }

  /**
   * @summary Нажатие на ссылку для вопросов в подвале страницы и проверка открытия новой вкладки с формой.
   * Проверяется открытый url и HTTP ответ сервера.
   * @param context объект текущего браузерного контекста
   */
  async clickFooterQuestionAndCheckPageResponse(
    context: BrowserContext
  ): Promise<void> {
    const expectedURL =
      "https://forms.yandex.ru/surveys/10033130.5b4b1762a8b370cdbbc12efd40b9527298c8f28e/";
    let pageFormForQuestions: Page;
    let responsePageForm: Response;
    await test.step(
      `Нажатие на ссылку для вопросов в подвале страницы`,
      async () => {
        [pageFormForQuestions, responsePageForm] = await Promise.all([
          context.waitForEvent("page"),
          context.waitForEvent(
            "response",
            (response) => response.url() === expectedURL
          ),
          this.footerQuestionsLink.click(),
        ]);
      }
    );

    await test.step(
      `Проверка, что открылся верный URL=${expectedURL} в новой вкладке`,
      async () => {
        await expect(pageFormForQuestions).toHaveURL(expectedURL);
      }
    );

    await test.step(
      "Проверка, что в новой вкладке ответ HTTP был с кодом 200-299",
      async () => {
        expect(responsePageForm.ok()).toEqual(true);
      }
    );
  }

  /**
   * @summary Проверка на соответствие заголовка текущей страницы.
   * @throws в случае не совпадения заголовка
   */
  async shouldHaveCorrectTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(this.expectedTitle);
  }

  /**
   * @returns {!Promise<boolean>}
   * @summary Проверка, что нужный элемент находится в текущей области видимости(viewPort)
   */
  isIntersectingViewport(selector: string): Promise<boolean> {
    return this.page.$eval(selector, async (element) => {
      const visibleRatio: number = await new Promise((resolve) => {
        const observer = new IntersectionObserver((entries) => {
          resolve(entries[0].intersectionRatio);
          observer.disconnect();
        });
        observer.observe(element);
        // Firefox doesn't call IntersectionObserver callback unless
        // there are rafs.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        requestAnimationFrame(() => {});
      });
      return visibleRatio > 0;
    });
  }
}
