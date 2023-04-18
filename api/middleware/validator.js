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
    let user;
    const token = req.get('A-Token');
    const userId = redisClient.getUserId(token);
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
  static async resetPasswordAndEmailTokenValidator(req, res, next) {
    let user;
    let { userId } = req.params;
    const { token } = req.params;

    userId = Types.ObjectId.isValid(userId)
      ? Types.ObjectId(userId)
      : userId;
    if (!Token.findOne({ user: userId, token })) {
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
