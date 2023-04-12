import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @class
 * Database utilities class
 */
class DBClient {
  /**
   * Connect to mongodb using mongoose
   */
  static async connect() {
    const { ENV } = process.env;
    const DEFAULT_URI = 'mongodb://127.0.0.1:27017/course_finder';
    switch (ENV) {
      case 'dev':
        await mongoose.connect(process.env.DB_DEV_URI);
        break;
      case 'test':
        await mongoose.connect(process.env.DB_TEST_URI);
        break;
      case 'prod':
        await mongoose.connect(process.env.DB_PROD_URI);
        break;
      default:
        await mongoose.connect(DEFAULT_URI);
        break;
    }
  }

  /**
   * Check if mongoose has established a connection
   * to mongodb
   * @returns { Boolean } - connection status
   */
  static isReady() {
    const status = mongoose.connection.readyState;
    if (status === 1) return true;
    return false;
  }
}

export default DBClient;
