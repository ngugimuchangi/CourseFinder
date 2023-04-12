import { createClient } from 'redis';

class RedisClient {
  /**
   * Redis client constructor
   */
  constructor() {
    const { ENV } = process.env;
    switch (ENV) {
      case 'dev':
        this.client = createClient({ url: process.env.REDIS_DEV_URI });
        break;
      case 'test':
        this.client = createClient({ url: process.env.REDIS_TEST_URI });
        break;
      case 'prod':
        this.client = createClient({ url: process.env.REDIS_PROD_URI });
        break;
      default:
        this.client = createClient();
        break;
    }
    this.client.on('error', (error) => {
      console.error(error.message);
    });
  }

  /**
   * Establish redis connection
   */
  async connect() {
    await this.client.connect();
  }

  /**
   * Checks if redis client is connected
   * @returns {Boolean} - redis client connection status
   */
  isReady() {
    return this.client.isReady;
  }

  /**
   * Stores token associated with user to redis
   * @param {string} token - user's token
   * @param {string} userId - id for user associated with the token
   */
  async setToken(token, userId) {
    const authToken = `auth${token}`;
    const expiry = 60 * 60 * 24;
    await this.client.set(authToken, userId, { EX: expiry, NX: true });
  }

  /**
   * Retrieve userId from redis based on given token
   * @param {string} - user token
   * @returns {string | null} - user's id or null if not found
   */
  async getUserId(token) {
    const authToken = `auth_${token}`;
    if (!await this.client.exists(authToken)) return null;
    const userId = await this.client.get(authToken);
    return userId;
  }

  /**
   * Deletes token from database
   * @param {string} token - authentication token
   */
  async deleteToken(token) {
    const authToken = `auth_${token}`;
    await this.client.del(authToken);
  }
}

const redisClient = new RedisClient();
export default redisClient;
