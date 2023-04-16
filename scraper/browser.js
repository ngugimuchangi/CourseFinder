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
    const { PROXY_USERNAME } = process.env;
    const { PROXY_PASSWORD } = process.env;
    const OLD_PROXY = `${PROXY_USERNAME}:${PROXY_PASSWORD}@${PROXY_URL}`;
    const NEW_PROXY = proxyChain.anonymizeProxy(OLD_PROXY);
    let browser;
    const browserOptions = {
      headless: true,
      args: [
        '--disable-setuid-sandbox',
        `--proxy-server=${NEW_PROXY}`,
      ],
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
