import DBClient from '../../shared/db';
import redisClient from '../../shared/redis';
import Category from '../../models/category';
import Subcategory from '../../models/subcategory';
import Course from '../../models/course';

// Application controller class
class AppController {
  /**
   * Send API db and redis status
   * @typedef {import('express').Request} Request
   * @typedef {import('express').Response} Response
   * @typedef {import('express').NextFunction} Next
   * @param {Request} _req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async getStatus(_req, res, next) {
    try {
      const db = DBClient.isReady();
      const redis = redisClient.isReady();
      res.status(200).json({ db, redis });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Send statics on categories, subcategories and courses
   * @param {Request} _req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async getStats(_req, res, next) {
    try {
      const categories = await Category.estimatedDocumentCount();
      const subcategories = await Subcategory.estimatedDocumentCount();
      const courses = await Course.estimatedDocumentCount();
      res.status(200).json({ categories, subcategories, courses });
    } catch (error) {
      next(error);
    }
  }
}

export default AppController;
