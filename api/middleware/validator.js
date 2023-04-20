import redisClient from '../../utils/shared/redis';
import User from '../../models/user';

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
    const userPaths = /^\/users\/me(\/email|\/password|\/topics|\/bookmarks)?\/?$/;
    const deletePaths = /^\/users\/me\/(topics|bookmarks)\/\w+/;
    const authPaths = /^\/auth\/(logout|verify-email)\/?$/;

    if (!userPaths.test(req.path) && !authPaths.test(req.path) && !deletePaths.test(deletePaths)) {
      next();
      return;
    }
    let user;
    const token = req.get('X-Token');
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
}

export default Validator;
