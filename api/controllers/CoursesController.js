import { Types } from 'mongoose';
import Course from '../../models/course';
import Format from '../utils/format';

class CourseController {
  /**
   * Gets list of all courses or course belonging to
   * specified subcategory
   * @typedef {import('express').Request} Request
   * @typedef {import('express').Response} Response
   * @typedef {import('express').NextFunction} Next
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {Next} next - next function
   */
  static async getCourses(req, res, next) {
    let courses;
    const filters = {};
    const PAGE_LIMIT = 10;
    const { provider } = req.query;
    let { categoryId } = req.query;
    const page = /^\d+$/.test(req.query.page)
      ? parseInt(req.query.page, 10)
      : 0;
    categoryId = Types.ObjectId.isValid(categoryId)
      ? new Types.ObjectId(categoryId)
      : categoryId;
    if (categoryId) filters.category = categoryId;
    if (provider) filters.provider = provider;
    const sort = { _id: 1 };
    const pipeline = [
      { $match: filters },
      { $sort: sort },
      { $skip: page * PAGE_LIMIT },
      { $limit: PAGE_LIMIT },
    ];
    try {
      courses = (await Course.aggregate(pipeline))
        .map((course) => Format.formatCourse(course));
    } catch (error) {
      next(error);
      return;
    }
    res.status(200).json(courses);
  }

  /**
    * Gets a course by its id
    * @param {Request} req - request object
    * @param {Response} res - response object
    * @param {Next} next - next function
    */
  static async getCoursesById(req, res, next) {
    let course;
    const { id } = req.params;
    try {
      course = await Course.findById(id);
    } catch (error) {
      next(error);
      return;
    }
    if (!course)res.status(404).json({ error: 'Not found' });
    else res.status(200).json(Format.formatCourse(course));
  }
}

export default CourseController;
