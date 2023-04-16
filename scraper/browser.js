import puppeteer from 'puppeteer';
import proxyChain from 'proxy-chain';

// Browser class
class Browser {
  /**
   * Creates a browser instance
   * @returns {object} - chromium browser instance
   */
  static async launchBrowser() {
    const { PROXY_URL } = process.env;
    console.log(PROXY_URL);
    const NEW_PROXY_URL = await proxyChain.anonymizeProxy(PROXY_URL);
    console.log(typeof NEW_PROXY_URL);
    let browser;
    const browserOptions = {
      headless: true,
      args: [`--proxy-server=${NEW_PROXY_URL}`],
      ignoreHTTPSErrors: true,
      defaultViewport: null,
    };
    try {
      browser = await puppeteer.launch(browserOptions);
    } catch (error) {
      throw new Error(`Failed to start browser => : ${error.message}`);
    }
    return browser;
  }
}

export default Browser;
