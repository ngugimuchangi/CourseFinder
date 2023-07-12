import scraper from './scraper';
import { addCourse } from './utils/courseUtilities';
import { infoLogger } from './utils/logger';

/**
 * Retrieves course data from pages
 * @param {object} browser - chromium browser instance
 * @param {object} page - page object
 * @param {string} courseLinkSelector - selector for course link
 */
async function getData(browser, page, courseLinkSelector) {
  const courseLinks = await scraper.getCourseLinks(
    page,
    courseLinkSelector,
  );
  const courseDataPromises = [];
  for (const link of courseLinks) {
    const coursePage = await scraper.goToPage(browser, link);
    courseDataPromises.push(scraper.getCourseData(coursePage));
  }
  const courseData = await Promise.all(courseDataPromises);
  return courseData;
}

/**
 * Controls saving course to databases
 * @param {Array} courseData - list of course objects
 * @param {string} provider - course provider
 */
async function saveData(courseData, provider) {
  const addCoursePromises = [];
  try {
    for (const data of courseData) {
      addCoursePromises.push(addCourse(data, provider));
    }
    await Promise.all(addCoursePromises);
  } catch (error) {
    throw new Error(`Saving courses failed: ${error}`);
  }
}

// Scrapper controller class
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
    this.browser = browser;
    this.url = url;
    this.provider = provider;
    this.courseSectionSelector = courseSectionSelector;
    this.courseLinkSelector = courseLinkSelector;
    this.nextSelector = nextSelector;
  }

  /**
   * Scraping controller
   */
  async scrape() {
    const page = await scraper.goToPage(this.browser, this.url, this.courseSectionSelector);
    let next = true;
    while (next) {
      const courseData = await getData(
        this.browser,
        page,
        this.courseLinkSelector,
      );
      await saveData(courseData, this.provider);
      if (this.nextSelector) {
        try {
          await scraper.goToNext(page, this.nextSelector);
        } catch (error) {
          next = false;
        }
      }
    }
    await page.close();
    await this.browser.close();
    infoLogger.info(`Data collection from ${this.provider} completed.`);
  }
}

export default ScraperController;
