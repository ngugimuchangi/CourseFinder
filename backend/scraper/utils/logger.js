import { createLogger, transports, format } from 'winston';

/**
 * Creates a logger for the web scraper
 * @returns {import('winston').Logger}
 */
function scrapperLogger() {
  // eslint-disable-next-line arrow-body-style
  const requestLogFormat = format.printf(({ level, timestamp, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  });
  const logger = createLogger({
    transports: [
      new transports.File({ level: 'info', filename: 'scraper/logs/session.log' }),
      new transports.File({ level: 'error', filename: 'scraper/logs/error.log' }),
    ],
    format: format.combine(format.timestamp(), requestLogFormat),
  });
  return logger;
}

const logger = scrapperLogger();
export default logger;
