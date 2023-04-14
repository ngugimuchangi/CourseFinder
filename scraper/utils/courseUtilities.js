import Course from '../../models/courses';
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
   * Adds new course to database
   * @param {course} course
   */
  static async addCourse(course) {
    const newCourse = new Course(course);
    await newCourse.save();
  }
}
export default CourseUtil;
