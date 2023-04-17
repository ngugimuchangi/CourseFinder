import dotenv from 'dotenv';
import Browser from './browser';
import DBClient from '../utils/shared/db';
import ScraperController from './controller';

dotenv.config();

/**
 * Scraper entry point
 */
async function main() {
  const MIN_WAIT = 1000 * 60 * 60 * 24 * 4;
  const MAX_WAIT = 1000 * 60 * 60 * 24 * 7;
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
    provider: 'udacity',
    courseSectionSelector: process.env.UDEMY_COURSE_SECTION_SELECTOR,
    courseLinkSelector: process.env.UDEMY_COURSE_LINK_SELECTOR,
    nextSelector: process.env.UDEMY_NEXT_SELECTOR,
  };

  let courseraScrapper;
  let udacityScrapper;
  let udemyScrapper;
  try {
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
  } catch (error) {
    console.error(error);
  }

  try {
    await DBClient.connect();
    await Promise.all([
      courseraScrapper.scraper(),
      udacityScrapper.scraper(),
      udemyScrapper.scraper(),
    ]);
    await DBClient.close();
  } catch (error) {
    console.log(error);
  }
  console.log('Scrapping session completed');
  setTimeout(() => main(), Math.random() * (MAX_WAIT - MIN_WAIT) + MIN_WAIT);
}

main();
