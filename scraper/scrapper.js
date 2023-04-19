import Parser from '../utils/scraper/parser';

// Course scrapper
class CourseScraper {
  /**
   * Navigates to specific url
   * @param {object} browser - chromium browser instance
   * @param {string} url - url for page to load
   * @param {string} courseSection - selector for successful ajax call
   * @returns {object} - page object
   */
  static async goToPage(browser, url, courseSection) {
    let page;
    const username = process.env.PROXY_USERNAME;
    const password = process.env.PROXY_PASSWORD;
    try {
      page = await browser.newPage();
      await page.authenticate({ username, password });
      await page.goto(url);
      await page.waitForTimeout(5000);
      if (courseSection) await page.waitForSelector(courseSection);
    } catch (error) {
      throw new Error(`Navigating to url: ${url} failed => : ${error}`);
    }
    return page;
  }

  /**
   * Gets list of free course links
   * @param {object} page - browser page object
   * @param {string} courseLinkSelector  - selector for course items
   * @returns {Array} - array of course links
   */
  static async getCourseLinks(page, courseLinkSelector) {
    let courseLinks;
    try {
      courseLinks = await page.$$eval(courseLinkSelector, (aTags) => aTags.map((a) => a.href));
    } catch (error) {
      throw new Error(`Getting course links failed => : ${error}`);
    }
    return courseLinks;
  }

  /**
   * Gets course data based on meta tags
   * @param {object} coursePage - browser page for a course
   * @returns {object} course data
   */
  static async getCourseData(coursePage) {
    let courseData;
    try {
      courseData = await Parser.metaParser(coursePage);
    } catch (error) {
      throw new Error(`Getting course data failed => : ${error}`);
    }
    await coursePage.close();
    return courseData;
  }

  /**
   * Navigates to next page
   * @param {object} page - browser page object
   * @param {string} nextSelector - next selector for page
   * @returns {object} - next page
   */
  static async goToNext(page, nextSelector) {
    try {
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        page.click(nextSelector),
      ]);
      // Needs refactoring
      await page.waitForTimeout(5000);
      await page.waitForSelector(nextSelector);
    } catch (error) {
      throw new Error(`Navigating to next page failed => : ${error}`);
    }
  }
}

export default CourseScraper;
