import { Types } from 'mongoose';
import User from '../../models/user';
import Course from '../../models/course';
import Format from '../../utils/api/format';

// User controller class
class UserController {
  /**
   * Creates new user
   * @typedef {import('express').Request} Request
   * @typedef {import('express').Response} Response
   * @typedef {import('express').NextFunction} Next
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async postUser(req, res, next) {
    const { email, password } = req.body;
    let user;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }
    try {
      user = new User({ email, password });
      user.hashPassword();
      await user.save();
    } catch (error) {
      next(error);
      return;
    }
    res.status(201).json(Format.formatUser(user));
  }

  /**
   * Get user details
   * @param {Request} req - request object
   * @param {Response} res - response object
   */
  static async getUser(req, res) {
    const { user } = req;
    res.status(200).json(Format.formatUser(user));
  }

  /**
   * Get user details
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async deleteUser(req, res, next) {
    const { user } = req;
    try {
      await User.findByIdAndDelete(user._id);
    } catch (error) {
      next(error);
      return;
    }
    res.status(204).json();
  }

  /**
   * Update user's email
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async putEmail(req, res, next) {
    const { user } = req;
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      return;
    }
    try {
      user.email = email;
      user.verified = false;
      await user.save();
      res.status(200).send(Format.formatUser(user));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Add users' bookmarks
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async postBookmark(res, req, next) {
    const { user } = req;
    const { courseId } = req.body;
    if (!courseId) {
      res.status(400).json({ error: 'Missing course id' });
      return;
    }
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        res.status(404).json({ error: 'Course not found' });
        return;
      }
      if (!user.bookmarks.includes(course._id)) user.bookmarks.push(course._id);
      await user.save();
      res.status(200).send(Format.formatUser(user));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete users' bookmarks
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async deleteBookmark(res, req, next) {
    const { user } = req;
    let { courseId } = req.body;
    if (!courseId) {
      res.status(400).json({ error: 'Missing course id' });
      return;
    }
    if (!Types.ObjectId.isValid(courseId)) {
      res.status(400).json({ error: 'Invalid course id' });
      return;
    }
    courseId = Types.ObjectId(courseId);
    if (!user.bookmarks.includes(courseId)) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    try {
      user.bookmarks.pop(user.bookmarks.indexOf(courseId));
      await user.save();
      res.status(200).send(Format.formatUser(user));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Reset users' password
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async putPassword(res, req, next) {
    const { user } = req;
    const { password } = req.body;
    if (!password) {
      res.status(400).send({ error: 'Missing password' });
      return;
    }
    user.password = password;
    user.hashPassword();
    try {
      await user.save();
    } catch (error) {
      next(error);
      return;
    }
    res.status(200).json(Format.formatUser(user));
  }
}

export default UserController;
