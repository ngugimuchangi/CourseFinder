import { Types } from 'mongoose';
import Course from '../models/course';
import { classify } from './classify';

/**
 * Check if course in database
 * @param {string} courseUrl - course url
 * @returns {boolean} - whether course is in database or not
 */
export async function courseInDB(course) {
  const { url } = course;
  try {
    const course = await Course.findOne({ url });
    if (course) return true;
  } catch (error) {
    throw new Error(`Checking course existence failed => : ${error.message}`);
  }
  return false;
}

/**
 * Finds the category associated with the course
 * @param {Course} course - course object
 * @returns {string} - id for subcategory linked to course
 */
export async function classifyCourse(course) {
  const { title, description } = course;
  const token = `${title}. ${description}`;
  let categoryId;
  try {
    categoryId = await classify(token);
  } catch (error) {
    throw new Error(`Course classification failed => :\n${error}`);
  }
  return categoryId;
}

/**
   * Creates new course document and saves it to the database
   * @param {object} courseData course data from parsed meta tags
   * @param {string} provider - course provider
   */
export async function addCourse(courseData, provider) {
  const course = courseData;
  if (await Course.findOne({ url: course.url })) return;
  const categoryId = await classifyCourse(course);
  course.category = Types.ObjectId.isValid(categoryId) ? new Types.ObjectId(categoryId)
    : categoryId;
  course.provider = provider;
  const newCourse = new Course(course);
  try {
    await newCourse.save();
  } catch (error) {
    throw new Error(`Failed to save new course => : ${error.message}`);
  }
}

const courseUtils = { courseInDB, classifyCourse, addCourse };

export default courseUtils;
