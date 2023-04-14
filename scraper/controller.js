import CourseScrapper from './scrapper';
// Scrapper controller
class ScrapperController {
  /**
   * Initializes class with new browser objects
   * @param {object} browser - chromium browser instance
   * @param {string} url - free courses url
   */
  constructor(browser, url) {
    this.browser = browser;
    this.url = url;
  }

  /**
   * Scrapping controller
   */
  async scrapeData() {
    const page = await CourseScrapper.goToPage(this.browser, this.url);
    return page;
  }
}

export default ScrapperController;
