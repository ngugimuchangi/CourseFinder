import { createLogger, transports, format } from 'winston';

/**
 * Creates a logger for the web scraper
 * @returns {import('winston').Logger}
 */
function scrapperLogger() {
  const sessionLogs = process.env.SCRAPER_INFO_LOGS || './logs/scraper/info.log';
  const errorLogs = process.env.SCRAPER_ERROR_LOGS || './logs/scraper/error.log';
  // eslint-disable-next-line arrow-body-style
  const requestLogFormat = format.printf(({ level, timestamp, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  });
  const logger = createLogger({
    transports: [
      new transports.File({ level: 'info', filename: sessionLogs }),
      new transports.File({ level: 'error', filename: errorLogs }),
    ],
    format: format.combine(format.timestamp(), requestLogFormat),
  });
  return logger;
}

const logger = scrapperLogger();
export default logger;
