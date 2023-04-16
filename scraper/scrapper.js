import Parser from './utils/parser';

// Course scrapper
class CourseScraper {
  /**
   * Navigates to specific url
   * @param {object} browser - chromium browser instance
   * @param {string} url - url for page to load
   * @returns {object} - page object
   */
  static async goToPage(browser, url) {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    return page;
  }

  /**
   * Gets list of free course links
   * @param {object} page - browser page object
   * @param {string} courseSection - selector for successful ajax call
   * @param {string} courseLinkELement  - selector for course items
   * @returns {Array} - array of course links
   */

  static async getCourseLinks(page, courseSection, courseLinkELement) {
    let courseLinks;
    try {
      await page.waitForSelector(courseSection);
      courseLinks = await page.$$eval(courseLinkELement, (aTags) => {
        const links = aTags.map((aTag) => aTag.href);
        return links;
      });
    } catch (error) {
      throw new Error(`Getting course links failed => : \n${error}`);
    }
    return courseLinks;
  }

  /**
   * Gets course data based on meta tags
   * @param {object} coursePage - browser page for a course
   * @returns {object} course data
   */
  static async getCourseData(coursePage) {
    const ogMetaTagElement = 'meta[property=og:*]';
    let courseData;
    try {
      const metaTags = coursePage.$$eval(ogMetaTagElement);
      courseData = Parser.metaParser(metaTags);
    } catch (error) {
      throw new Error(`Getting course data failed => : \n${error}`);
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
      const nextPaginationElement = page.$eval(nextSelector);
      if (nextPaginationElement) await page.click(nextPaginationElement);
    } catch (error) {
      throw new Error(`Navigating to next page failed => :\n${error}`);
    }
  }
}

export default CourseScraper;
