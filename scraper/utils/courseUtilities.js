import { Types } from 'mongoose';
import Course from '../../models/course';
import ClassifyCourse from './classify';

class CourseUtil {
  /**
   * Check if course in database
   * @param {string} courseUrl - course url
   * @returns {boolean} - whether course is in database or not
   */
  static async courseInDB(course) {
    const { url } = course;
    try {
      const course = await Course.findOne({ url });
      if (course) return true;
    } catch (error) {
      console.error(error.message);
    }
    return false;
  }

  /**
   * Finds the category associated with the course
   * @param {object} course - course object
   * @returns {string} - id for subcategory linked to course
   */
  static async classifyCourse(course) {
    const { description } = course;
    let categoryId;
    try {
      categoryId = await ClassifyCourse.getCourseCategory(description);
    } catch (error) {
      console.error(error.message);
    }
    return categoryId;
  }

  /**
   * Creates new course document and saves it to the database
   * @param {object} courseData course data from parsed meta tags
   * @param {*} provider - course provider
   */
  static async addCourse(courseData, provider) {
    const course = courseData;
    if (await Course.findOne({ url: course.url })) return;
    const categoryId = await this.classifyCourse(course);
    course.categoryId = Types.ObjectId.isValid(categoryId) ? new Types.ObjectId(categoryId)
      : categoryId;
    course.provider = provider;
    const newCourse = new Course(course);
    try {
      await newCourse.save();
    } catch (error) {
      console.error(`Failed to save new course => : ${error.message}`);
    }
  }
}
export default CourseUtil;