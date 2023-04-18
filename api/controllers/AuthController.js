import { v4 } from 'uuid';
import redisClient from '../../utils/shared/redis';
import User from '../../models/user';

// Authentication controller class
class AuthController {
  /**
   * Login user
   * @typedef {import('express').Request} Request
   * @typedef {import('express').Response} Response
   * @typedef {import('express').NextFunction} Next
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async login(req, res, next) {
    const { email, password } = req.body;
    const user = User.findOne({ email });
    if (!user || !user.isValid(password)) {
      next({ statusCode: 401, message: 'Unauthorized' });
      return;
    }
    const token = v4();
    try {
      await redisClient.setToken(token);
    } catch (error) {
      next(error);
      return;
    }
    res.status(200).json({ token });
  }

  /**
   * Logout user
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async logout(req, res, next) {
    const token = req.get('A-Token');
    try {
      await redisClient.deleteToken(token);
    } catch (error) {
      next(error);
      return;
    }
    res.status(204).json();
  }

  /**
   * Verifies user email
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async verify(req, res, next) {
    const { user } = req;
    user.verified = true;
    try {
      await user.save();
    } catch (error) {
      next(error);
      return;
    }
    res.status(200).json({ verified: true });
  }
}

export default AuthController;
