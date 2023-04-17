import { executablePath } from 'puppeteer';
import puppeteerExtra from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteerExtra.use(stealthPlugin());

class Browser {
  /**
   * Creates a browser instance
   * @returns {object} - chromium browser instance
   */
  static async launchBrowser() {
    const { PROXY_URL } = process.env;
    let browser;
    const browserOptions = {
      headless: true,
      executablePath: executablePath(),
      args: [`--proxy-server=${PROXY_URL}`],
      ignoreHTTPSErrors: true,
      defaultViewport: null,
    };
    try {
      browser = await puppeteerExtra.launch(browserOptions);
    } catch (error) {
      throw new Error(`Failed to start browser => : ${error}`);
    }
    return browser;
  }
}

export default Browser;
