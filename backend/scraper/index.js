import dotenv from 'dotenv';
import Browser from './browser';
import DBClient from '../shared/db';
import ScraperController from './controller';
import logger from './utils/logger';

dotenv.config();

let session = 1;

/**
 * Scraper entry point
 */
async function main() {
  const MIN_WAIT = parseInt(process.env.MIN_WAIT, 10);
  const MAX_WAIT = parseInt(process.env.MAX_WAIT, 10);
  const COURSERA_ENV = {
    url: process.env.COURSERA_URL,
    provider: 'coursera',
    courseSectionSelector: process.env.COURSERA_COURSE_SECTION_SELECTOR,
    courseLinkSelector: process.env.COURSERA_COURSE_LINK_SELECTOR,
    nextSelector: process.env.COURSERA_NEXT_SELECTOR,
  };
  const UDACITY_ENV = {
    url: process.env.UDACITY_URL,
    provider: 'udacity',
    courseSectionSelector: process.env.UDACITY_COURSE_SECTION_SELECTOR,
    courseLinkSelector: process.env.UDACITY_COURSE_LINK_SELECTOR,
    nextSelector: process.env.UDACITY_NEXT_SELECTOR,
  };
  const UDEMY_ENV = {
    url: process.env.UDEMY_URL,
    provider: 'udemy',
    courseSectionSelector: process.env.UDEMY_COURSE_SECTION_SELECTOR,
    courseLinkSelector: process.env.UDEMY_COURSE_LINK_SELECTOR,
    nextSelector: process.env.UDEMY_NEXT_SELECTOR,
  };

  let courseraScrapper;
  let udacityScrapper;
  let udemyScrapper;
  try {
    logger.info(`Scrapping session #${session} started`);
    await DBClient.connect();
    courseraScrapper = new ScraperController(
      await Browser.launchBrowser(),
      COURSERA_ENV.url,
      COURSERA_ENV.provider,
      COURSERA_ENV.courseSectionSelector,
      COURSERA_ENV.courseLinkSelector,
      COURSERA_ENV.nextSelector,
    );
    udacityScrapper = new ScraperController(
      await Browser.launchBrowser(),
      UDACITY_ENV.url,
      UDACITY_ENV.provider,
      UDACITY_ENV.courseSectionSelector,
      UDACITY_ENV.courseLinkSelector,
      UDACITY_ENV.nextSelector,
    );
    udemyScrapper = new ScraperController(
      await Browser.launchBrowser(),
      UDEMY_ENV.url,
      UDEMY_ENV.provider,
      UDEMY_ENV.courseSectionSelector,
      UDEMY_ENV.courseLinkSelector,
      UDEMY_ENV.nextSelector,
    );
    await Promise.all([
      courseraScrapper.scraper(),
      udacityScrapper.scraper(),
      udemyScrapper.scraper(),
    ]);
    await DBClient.close();
  } catch (error) {
    logger.error(`Scrapping session#${session} error : ${error}`);
  }
  logger.info(`Scraping session #${session} completed`);
  session += 1;
  setTimeout(() => main(), Math.random() * (MAX_WAIT - MIN_WAIT) + MIN_WAIT);
}

main();
