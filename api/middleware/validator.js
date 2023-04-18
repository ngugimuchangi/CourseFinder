import { Types } from 'mongoose';
import redisClient from '../../utils/shared/redis';
import User from '../../models/user';
import Token from '../../models/token';

// Authentication tokens validation class
class Validator {
  /**
   * Validates login token
   * @typedef {import('express').Request} Request
   * @typedef {import('express').Response} Response
   * @typedef {import('express').NextFunction} Next
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async authTokenValidator(req, res, next) {
    const userPaths = /^\/users\/(me|email|password|bookmarks)\/?$/;
    const logoutPath = /^\/logout\/?$/;

    if (!userPaths.test(req.path) && !logoutPath.test(req.path)) {
      next();
      return;
    }
    let user;
    const token = req.get('A-Token');
    const userId = await redisClient.getUserId(token);
    try {
      user = await User.findById(userId).populate('bookmarks');
    } catch (error) {
      next(error);
      return;
    }
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    req.user = user;
    next();
  }

  /**
   * Validate email verification token for new user and changed emails.
   * Also validates password token in forgot login scenarios.
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async resetTokenValidator(req, res, next) {
    const paths = /^(\/verify-email|\/users\/reset-password)\/?$/;
    if (!paths.test(req.path)) {
      next();
      return;
    }

    let user;
    let { userId } = req.params;
    const { token } = req.params;

    userId = Types.ObjectId.isValid(userId)
      ? Types.ObjectId(userId)
      : userId;
    if (!await Token.findOne({ user: userId, token })) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    try {
      user = await User.findById(userId).populate('bookmarks');
    } catch (error) {
      next(error);
      return;
    }
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    req.user = user;
    next();
  }
}

export default Validator;
