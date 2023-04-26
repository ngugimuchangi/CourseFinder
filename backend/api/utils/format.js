/**
   * Formats user object for responses
   * @param {object} user - user object
   * @returns {object} -formatted user object
   */
function formatUser(user) {
  const id = user._id;
  const { email, topics, verified } = user;
  const bookmarks = user.bookmarks
    .map((bookmark) => `/courses/${bookmark._id}`);
  const formattedUserResponse = {
    id, email, verified, topics, bookmarks,
  };
  return formattedUserResponse;
}

/**
   * Formats course object for responses
   * @param {object} course - course object
   * @returns {object} -formatted course object
   */
function formatCourse(course) {
  const id = course._id;
  const {
    title, description, provider, url, imageUrl,
  } = course;
  const formattedCourseResponse = {
    id, title, description, provider, url, imageUrl,
  };
  return formattedCourseResponse;
}

/**
   * Formats user object for responses
   * @param {object} category - category object
   * @returns {object} -formatted category object
   */
function formatCategory(category) {
  const id = category._id;
  const { title } = category;
  const url = `/categories/${id}`;
  const formattedCategoryResponse = {
    id,
    title,
    url,
  };
  return formattedCategoryResponse;
}

/**
   * Formats subcategory object for responses
   * @param {object} subcategory - subcategory object
   * @returns {object} -formatted subcategory object
   */
function formatSubcategory(subcategory) {
  const id = subcategory._id;
  const { title, category, keywords } = subcategory;
  const categoryUri = `/categories/${category._id}`;
  const url = `/subcategories/${id}`;
  const formattedSubcategoryResponse = {
    id,
    title,
    url,
    category: categoryUri,
    keywords,
  };
  return formattedSubcategoryResponse;
}

const formats = {
  formatUser, formatCategory, formatSubcategory, formatCourse,
};
export default formats;
