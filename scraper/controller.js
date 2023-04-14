import CourseScrapper from './scrapper';
import CourseUtil from './utils/courseUtilities';

/**
   * getsData from pages
   * @param {object} page - page object
   */
async function getData(page) {
  const courseLinks = await CourseScrapper.getCourseLinks(
    page,
    this.courseSectionSelector,
    this.courseLinkSelector,
  );
  const coursePages = [];
  const courseDataPromises = [];
  const addCoursePromises = [];
  for (const link of courseLinks) {
    // necessary due to minimize browser resource consumption
    // eslint-disable-next-line no-await-in-loop
    coursePages.push(await CourseScrapper.goToPage(link));
  }
  for (const coursePage of coursePages) {
    courseDataPromises.push(CourseScrapper.getCourseData(coursePage));
  }
  const courseData = await Promise.all(courseDataPromises);
  for (const data of courseData) {
    addCoursePromises.push(CourseUtil.addCourse(data));
  }
  await Promise.all(addCoursePromises);
}

// Scrapper controller
class ScrapperController {
  /**
   * Initializes class with new browser objects
   * @param {object} browser - chromium browser instance
   * @param {string} url - free courses url
   * @param {string} provider - site provide the course
   * @param {string} courseSectionSelector - selector for course properties
   * @param {string} courseLinkSelector - selector for course link
   * @param {string} nextSelector - selector for next section
   */
  constructor(
    browser,
    url,
    provider,
    courseSectionSelector,
    courseLinkSelector,
    nextSelector,
  ) {
    this.provider = provider;
    this.browser = browser;
    this.url = url;
    this.courseSectionSelector = courseSectionSelector;
    this.courseLinkSelector = courseLinkSelector;
    this.nextSelector = nextSelector;
  }

  /**
   * Scrapping controller
   */
  async scrapeData() {
    const page = await CourseScrapper.goToPage(this.browser, this.url);
    await getData(page);
    while (this.nextSelector && page.$eval(this.nextSelector)) {
      try {
        // necessary due to minimize browser resource consumption
        // eslint-disable-next-line no-await-in-loop
        await CourseScrapper.goToNext(page, this.nextSelector);
        // eslint-disable-next-line no-await-in-loop
        await getData(page);
      } catch (error) {
        console.error(error.message);
      }
    }
    await page.close();
    await this.browser.close();
  }
}

export default ScrapperController;
