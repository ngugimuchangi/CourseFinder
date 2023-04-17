import RedisClient  from '../../utils/redis';

// Authentication tokens validation class
class AuthValidator {
  /**
   * @typedef {import('express').Request} Request
   * @typedef {import('express').Response} Response
   * @typedef {import('express').NextFunction} Next
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async loginTokenValidator(req, res, next) {

  }

  /**
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async resetTokenValidator(req, re, next) {}
  
  /**
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async emailTokenValidator(req, res, next) {

  }
}
