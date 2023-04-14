import Browser from './browser';
import ScrapperController from './controller';

async function main() {
  const MIN_WAIT = 1000 * 60 * 60 * 24 * 4;
  const MAX_WAIT = 1000 * 60 * 60 * 24 * 7;
  const UDACITY_URL = process.env.UDACITY_URL || '';
  const UDEMY_URL = process.env.UDEMY_URL || '';
  const COURSERA_URL = process.env.COURSERA_URL || '';
  let courseraScrapper;
  let udacityScrapper;
  let udemyScrapper;
  try {
    courseraScrapper = new ScrapperController(await Browser.launchBrowser(), COURSERA_URL);
    udacityScrapper = new ScrapperController(await Browser.launchBrowser(), UDACITY_URL);
    udemyScrapper = new ScrapperController(await Browser.launchBrowser(), UDEMY_URL);
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
