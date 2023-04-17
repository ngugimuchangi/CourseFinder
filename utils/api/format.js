import Subcategory from '../models/subcategory';

// Formatting class
class Format{
  /**
   * Formats user object for responses
   * @param {object} user - user object
   * @returns {object} -formatted user object
   */
  static formatUser(user) {
    user.save
    const id = user._id.toString();
    const { email, topics } = user;
    const { bookmarks } = user.bookmarks.map((bookmark) => `/api/v1/courses/${bookmark.toString()}`)
    const formattedUserResponse = { id, email, topics, bookmarks }
    return formattedUserResponse;
  }
  
  /**
   * Formats user object for responses
   * @param {object} course - user object
   * @returns {object} -formatted course object
   */
  static formatCourse(course) {
    const id = course._id.toString();
    const { title, description, url, imageUrl } = course;
    const formattedCourseObject = { id, title, description, url, imageUrl }
    return formattedCourseObject;
  }
}
