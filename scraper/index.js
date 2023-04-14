import Browser from './browser';
import ScrapperController from './controller';

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
    courseraScrapper = new ScrapperController(
      await Browser.launchBrowser(),
      COURSERA_ENV.url,
      COURSERA_ENV.provider,
      COURSERA_ENV.courseSectionSelector,
      COURSERA_ENV.courseLinkSelector,
      COURSERA_ENV.nextSelector,
    );
    udacityScrapper = new ScrapperController(
      await Browser.launchBrowser(),
      UDACITY_ENV.url,
      UDACITY_ENV.provider,
      UDACITY_ENV.courseSectionSelector,
      UDACITY_ENV.courseLinkSelector,
      UDACITY_ENV.nextSelector,
    );
    udemyScrapper = new ScrapperController(
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
    await Promise.all([courseraScrapper.scrapeData(),
      udacityScrapper.scrapeData(),
      udemyScrapper.scrapeData()]);
  } catch (error) {
    console.log(error.message);
  }
  setTimeout(() => main(), Math.random() * (MAX_WAIT - MIN_WAIT) + MIN_WAIT);
}

main();
