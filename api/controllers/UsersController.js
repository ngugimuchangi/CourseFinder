import { randomBytes } from 'node:crypto';
import { Types } from 'mongoose';
import User from '../../models/user';
import Course from '../../models/course';
import Format from '../../utils/api/format';
import Token from '../../models/token';
import EmailJobs from '../../jobs/emailJobs';

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
      if (await User.findOne({ email })) {
        res.status(409).send({ error: 'User already exists' });
        return;
      }
      user = new User({ email, password });
      user.hashPassword();
      await user.save();
    } catch (error) {
      next(error);
      return;
    }
    const token = new Token({
      user: user._id,
      token: randomBytes(32).toString('hex'),
      role: 'verify',
    });
    await token.save();
    await EmailJobs.addEmailJob(user, 'welcome', token.token);
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
      const token = new Token({
        user: user._id,
        role: 'verify',
        token: randomBytes(32).toString('hex'),
      });
      EmailJobs.addEmailJob(user, 'verify', token.token);
      res.status(200).json(Format.formatUser(user));
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update logged in user's password
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async putPassword(req, res, next) {
    const { user } = req;
    const { password } = req.body;
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      return;
    }
    try {
      user.password = password;
      user.hashPassword();
      await user.save();
    } catch (error) {
      next(error);
    }
    res.status(204).json();
  }

  /**
   * Gets list of all user's bookmarks
   * @param {Request} req - request object
   * @param {Response} res - response object
   */
  static async getBookmarks(req, res) {
    const { user } = req;
    const bookmarks = user.bookmarks.map((bookmark) => Format.formatCourse(bookmark));
    res.status(200).json({ count: bookmarks.length, bookmarks });
  }

  /**
   * Add a topic to the list of topics belonging to a user
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async putTopic(req, res, next) {
    const { user } = req;
    const { topic } = req.body;
    if (!topic) {
      res.status(400).json({ error: 'Missing topic' });
      return;
    }
    if (!user.topics.includes(topic)) {
      user.topics.push(topic);
      try {
        await user.save();
      } catch (error) {
        next(error);
        return;
      }
    }
    res.status(200).json(Format.formatUser(user));
  }

  /**
   * Deletes a topic from the list of topics belonging to a user
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async deleteTopic(req, res, next) {
    const { user } = req;
    const { topic } = req.body;
    if (!topic) {
      res.status(400).json({ error: 'Missing topic' });
      return;
    }
    if (user.topics.includes(topic)) {
      user.topics.pop(user.topics.indexOf(topic));
      try {
        await user.save();
      } catch (error) {
        next(error);
        return;
      }
    }
    res.status(200).json(Format.formatUser(user));
  }

  /**
   * Add users' bookmarks
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async putBookmark(req, res, next) {
    const { user } = req;
    if (!req.body || !req.body.courseId) {
      res.status(400).json({ error: 'Missing course id' });
      return;
    }
    const { courseId } = req.body;
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      if (user.bookmarks.some((bookmark) => bookmark._id.toString() === course._id.toString())) {
        res.status(409).json({ error: 'Bookmark exists' });
        return;
      }
      user.bookmarks.push(course);
      await user.save();
      res.status(200).json(Format.formatUser(user));
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
  static async deleteBookmark(req, res, next) {
    const { user } = req;
    const { courseId } = req.body;

    if (!courseId) {
      res.status(400).json({ error: 'Missing course id' });
      return;
    }
    if (!Types.ObjectId.isValid(courseId)) {
      res.status(400).json({ error: 'Invalid course id' });
      return;
    }
    const course = user.bookmarks.find((bookmark) => bookmark._id.toString() === courseId);
    if (!course) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    try {
      user.bookmarks = user.bookmarks.filter((bookmark) => bookmark._id.toString() !== courseId);
      await user.save();
    } catch (error) {
      next(error);
    }
    res.status(200).send(Format.formatUser(user));
  }
}

export default UserController;
