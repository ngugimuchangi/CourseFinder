import expressWinston from 'express-winston';
import {transports, format} from 'winston';

class Logger {
  static infoLogger(){
    const infoTransport = {
      transports: [
        new transports.File(),
      ],
      format: format.timestamp()
    }

  }
  static debugLogger(){
    const debugTransport = {};
  }
}
