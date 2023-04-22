import { randomBytes } from 'node:crypto';
import { Types } from 'mongoose';
import redisClient from '../../shared/redis';
import User from '../../models/user';
import Token from '../../models/token';
import EmailJobs from '../jobs/emailJobs';
import Format from '../utils/format';

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
    let token;
    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });
    try {
      const user = await User.findOne({ email });
      if (!user || !user.isValidPassword(password)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      token = randomBytes(32).toString('hex');
      await redisClient.setToken(token, user._id.toString());
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ token });
  }

  /**
   * Logout user
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async logout(req, res, next) {
    const token = req.get('X-Token');
    try {
      await redisClient.deleteToken(token);
    } catch (error) {
      return next(error);
    }
    return res.status(204).json();
  }

  /**
   * Get another email verification token if expired
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async getEmailToken(req, res, next) {
    const { user } = req;
    if (user.verified) return res.status(204).json();
    const token = new Token({
      user: user._id,
      role: 'verify',
      token: randomBytes(32).toString('hex'),
    });
    try {
      await token.save();
      await EmailJobs.addEmailJob(user, 'verify', token.token);
    } catch (error) {
      return next(error);
    }
    return res.status(204).json();
  }

  /**
   * Validates user email
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async putVerifyEmail(req, res, next) {
    let user;
    let { token, userId } = req.params;
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    userId = new Types.ObjectId(userId);
    try {
      token = await Token.findOne({ user: userId, role: 'verify', token });
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      user.verified = true;
      await user.save();
      await Token.deleteOne({ token: req.params.token });
    } catch (error) {
      return next(error);
    }
    return res.status(200).json({ verified: user.verified });
  }

  /**
   * Gets password reset token in forgot password scenarios
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async postResetPassword(req, res, next) {
    let token;
    let user;
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    try {
      user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'Not found' });
      }
      token = new Token({
        user: user._id,
        token: randomBytes(32).toString('hex'),
        role: 'reset',
      });
      await token.save();
    } catch (error) {
      return next(error);
    }
    EmailJobs.addEmailJob(user, 'reset', token.token);
    return res.status(204).json();
  }

  /**
    * Reset users' password
    * @param {Request} req - request object
    * @param {Response} res - response object
    * @param {Next} next - next function
    */
  static async putResetPassword(req, res, next) {
    let user;
    let { token } = req.params;
    const { userId } = req.params;
    const { password } = req.body;

    if (!Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
      token = await Token.findOne({ user: userId, role: 'reset', token });
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      user.password = password;
      user.hashPassword();
      await user.save();
      await Token.deleteOne({ token: req.params.token });
    } catch (error) {
      return next(error);
    }
    return res.status(200).json(Format.formatUser(user));
  }
}

export default AuthController;
