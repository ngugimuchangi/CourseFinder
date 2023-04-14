import parser from './utils/parser';

// Course scrapper
class CourseScrapper {
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
    await page.waitForSelector(courseSection);
    const courseLinks = await page.$$eval(courseLinkELement, (aTags) => {
      const links = aTags.map((aTag) => aTag.href);
      return links;
    });
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
      courseData = parser.metaParser(metaTags);
    } catch (error) {
      console.error(error.message);
    }
    await coursePage.close();
    return courseData;
  }

  /**
   *
   * @param {object} page - browser page object
   * @param {*} nextSelector - next selector for page
   * @returns {object} - next page
   */
  static async goToNext(page, nextSelector) {
    const nextPaginationElement = page.$eval(nextSelector);
    if (nextPaginationElement);
    await page.click(nextPaginationElement);
    return page;
  }
}

export default CourseScrapper;
