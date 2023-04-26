import { createLogger, transports, format } from 'winston';

/**
 * Creates a file logger for the web scraper
 * @returns {import('winston').Logger}
 */
function scraperLogger(level, filepath) {
  // eslint-disable-next-line arrow-body-style
  const scraperLogFormat = format.printf(({ level, timestamp, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  });
  const logger = createLogger({
    transports: [new transports.File({ level, filename: filepath })],
    format: format.combine(format.timestamp(), scraperLogFormat),
  });
  return logger;
}

const infoLogFile = process.env.SCRAPER_INFO_LOGS || './logs/scraper/info.log';
const errorLogFile = process.env.SCRAPER_ERROR_LOGS || './logs/scraper/error.log';
export const infoLogger = scraperLogger('info', infoLogFile);
export const errorLogger = scraperLogger('error', errorLogFile);

const logger = { infoLogger, errorLogger };
export default logger;
