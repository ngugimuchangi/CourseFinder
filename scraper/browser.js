import puppeteer from 'puppeteer';

// Browser class
class Browser {
  /**
   * Creates a browser instance
   * @returns {object} - chromium browser instance
   */
  static async launchBrowser() {
    let browser;
    const browserOptions = {
      headless: true,
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
      defaultViewport: null,
    };
    try {
      browser = await puppeteer.launch(browserOptions);
    } catch (error) {
      console.error(`Failed to start browser => : ${error.message}`);
    }
    return browser;
  }
}

export default Browser;
