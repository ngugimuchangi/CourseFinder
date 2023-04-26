import { createLogger, transports, format } from 'winston';

/**
 * @typedef {import('winston').Logger} WinstonLogger
 * Requests logger
 * @returns {WinstonLogger} - Winston logger instance
 */
function accessLogger() {
  const accessLogs = process.env.SERVER_ACCESS_LOGS || './logs/server/access.log';
  const requestLogFormat = format.printf(({ level, timestamp, meta }) => {
    const { method, url } = meta.req;
    const { statusCode } = meta.res;
    const { responseTime } = meta;
    return `[${timestamp}] ${level.toUpperCase()}: ${method} ${url} ${statusCode} ${responseTime}`;
  });
  const logger = createLogger({
    transports: [new transports.File({ filename: accessLogs })],
    format: format.combine(format.timestamp(), requestLogFormat),
  });
  return logger;
}

/**
 * Internal errors logger
 * @returns {WinstonLogger} winston logger object for logging internal server errors
 */
function errorLogger() {
  const errorLogs = process.env.SERVER_ERROR_LOGS || './logs/server/error.log';
  const errorLogFormat = format.printf(({ level, timestamp, meta }) => {
    const { method, url } = meta.req;

    const { message } = meta;
    return `[${timestamp}] ${level.toUpperCase()}: ${method} ${url} Error: ${message} {}`;
  });
  const logger = createLogger({
    transports: [new transports.File({ filename: errorLogs })],
    format: format.combine(format.timestamp(), errorLogFormat),
  });
  return logger;
}

const logger = {
  accessLogger,
  errorLogger,
};

export default logger;
