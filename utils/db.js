import mongoose from 'mongoose';

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
    const DEV_URI = process.env.DB_DEV_URI;
    const TEST_URI = process.env.DB_TEST_URI;
    const PROD_URI = process.env.DB_PROD_URI;
    let connectionUri;
    if (ENV === 'dev' && DEV_URI) connectionUri = DEV_URI;
    else if (ENV === 'test' && TEST_URI) connectionUri = TEST_URI;
    else if (ENV === 'prod' && PROD_URI) connectionUri = PROD_URI;
    else connectionUri = DEFAULT_URI;
    await mongoose.connect(connectionUri);
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
