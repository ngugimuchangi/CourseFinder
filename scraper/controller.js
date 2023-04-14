import CourseScraper from './scrapper';
import CourseUtil from './utils/courseUtilities';
/* necessary due to minimize browser resource consumption */
/* eslint no-await-in-loop: 0 */ // --> OFF
/**
   * Retrieves course data from pages
   * @param {object} browser - chromium browser instance
   * @param {object} page - page object
   * @param {string} courseSectionSelector - selector for course section
   * @param {string} courseLinkSelector - selector for course link
   */
async function getData(browser, page, courseSectionSelector, courseLinkSelector) {
  const courseLinks = await CourseScraper.getCourseLinks(
    page,
    courseSectionSelector,
    courseLinkSelector,
  );
  const courseDataPromises = [];
  for (const link of courseLinks) {
    const coursePage = await CourseScraper.goToPage(browser, link);
    courseDataPromises.push(CourseScraper.getCourseData(coursePage));
  }
  const courseData = await Promise.all(courseDataPromises);
  return courseData;
}

// Scrapper controller
class ScraperController {
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
   * Scraping controller
   */
  async scraper() {
    const page = await CourseScraper.goToPage(this.browser, this.url);
    let addCoursePromises;
    let courseData;
    let next = true;
    while (next) {
      try {
        addCoursePromises = [];
        courseData = await getData(
          this.browser,
          page,
          this.courseSectionSelector,
          this.courseLinkSelector,
        );
        for (const data of courseData) {
          addCoursePromises.push(CourseUtil.addCourse(data, this.provider));
        }
        await Promise.all(addCoursePromises);
      } catch (error) {
        console.error(error.message);
      }
      if (this.nextSelector && page.$eval(this.nextSelector)) {
        await CourseScraper.goToNext(page, this.nextSelector);
      } else next = false;
    }
    await page.close();
    await this.browser.close();
  }
}

export default ScraperController;
