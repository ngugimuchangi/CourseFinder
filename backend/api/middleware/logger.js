<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
class Logger {
  
}
=======
import { createLogger, transports, format } from 'winston';

// Logging class
class Logger {
  /**
   * @typedef {import('winston').Logger} WinstonLogger
<<<<<<< HEAD
   * Requests logger
   * @returns {WinstonLogger} - Winston logger instance
   */
  static requestLogger() {
    const requestLogFormat = format.printf(({ level, timestamp, meta }) => {
      const { method, url } = meta.req;
      const { statusCode } = meta.res;
      const { responseTime } = meta;
      return `[${timestamp}] ${level.toUpperCase()}: ${method} ${url} ${statusCode} ${responseTime}`;
    });
    const logger = createLogger({
      transports: [new transports.File({ filename: 'api/logs/access.log' })],
      format: format.combine(format.timestamp(), requestLogFormat),
    });
    return logger;
  }

  /**
   * Internal errors logger
   * @returns {WinstonLogger} winston logger object for logging internal server errors
   */
  static errorLogger() {
    const errorLogFormat = format.printf(({ level, timestamp, meta }) => {
      const { method, url } = meta.req;

      const { message } = meta;
      return `[${timestamp}] ${level.toUpperCase()}: ${method} ${url} Error: ${message} {}`;
    });
    const logger = createLogger({
      transports: [new transports.File({ filename: 'api/logs/error.log' })],
      format: format.combine(format.timestamp(), errorLogFormat),
    });
    return logger;
  }
}

export default Logger;
>>>>>>> front-end_dev
=======
import expressWinston from 'express-winston';
import {transports, format} from 'winston';
=======
import { createLogger, transports, format } from 'winston';
>>>>>>> b31fc5f (integrated request and error loggers)

// Logging class
class Logger {
  /**
=======
>>>>>>> 8e4f243 (updated log path)
   * Requests logger
   * @returns {WinstonLogger} - Winston logger instance
   */
  static requestLogger() {
    const requestLogFormat = format.printf(({ level, timestamp, meta }) => {
      const { method, url } = meta.req;
      const { statusCode } = meta.res;
      const { responseTime } = meta;
      return `[${timestamp}] ${level.toUpperCase()}: ${method} ${url} ${statusCode} ${responseTime}`;
    });
    const logger = createLogger({
      transports: [new transports.File({ filename: 'api/logs/access.log' })],
      format: format.combine(format.timestamp(), requestLogFormat),
    });
    return logger;
  }

  /**
   * Internal errors logger
   * @returns {WinstonLogger} winston logger object for logging internal server errors
   */
  static errorLogger() {
    const errorLogFormat = format.printf(({ level, timestamp, meta }) => {
      const { method, url } = meta.req;

      const { message } = meta;
      return `[${timestamp}] ${level.toUpperCase()}: ${method} ${url} Error: ${message} {}`;
    });
    const logger = createLogger({
      transports: [new transports.File({ filename: 'api/logs/error.log' })],
      format: format.combine(format.timestamp(), errorLogFormat),
    });
    return logger;
  }
}
<<<<<<< HEAD
>>>>>>> f403751 (repo restructure)
=======

export default Logger;
>>>>>>> b31fc5f (integrated request and error loggers)
