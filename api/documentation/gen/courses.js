/**
 * @api {get} /courses Get courses
 * @apiName getCourses
 * @apiGroup Courses
 * @apiDescription Gets list of all courses.
 * @apiQuery {String} [query] Search query parameter
 * @apiQuery {String} [provider] Course provider
 * @apiQuery {String} [categoryId] CategoryId for courses
 * @apiQuery {Number} [page=0] Pagination query parameter starting from 0 index
 * @apiSuccess {Array} categories List of all courses that match the query parameters
 * @apiSuccessExample Success-Response:
 * [
 *   {
 *       "id": "643e40d0d1e93c81f60dda71",
 *       "title": "Google Cloud Digital Leader Training Course | Free Courses | Udacity",
 *       "description": "Take Udacity's free Cloud Digital Leader Training Course by Google and gain foundational knowledge of cloud technology and data. Learn online with Udacity.",
 *       "provider": "udacity",
 *       "url": "https://www.udacity.com/course/google-cloud-digital-leader-training--ud301",
 *       "imageUrl": "https://www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/3NeA5a2O7EaizguZRT1X76/46da849095bf11094420ef104505b807/Google_Digital_Leader_FreeCourse.jpg"
 *   },
 *   {
 *       "id": "643e40d0d1e93c81f60dda73",
 *       "title": "Learn Google Workspace | Google Workspace Course | Free Courses | Udacity",
 *       "description": "Take Udacity's free Google Workspace course and learn the core Google Workspace applications: Gmail, Google Calendar, Google Drive and more. Learn online with Udacity.",
 *       "provider": "udacity",
 *       "url": "https://www.udacity.com/course/getting-started-with-google-workspace--ud300",
 *       "imageUrl": "https://www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/2AmV3J0fopUmlR8Zbve1gW/0da6028af502ebdc2e819e4f6c3c9ce5/GoogleCloud_FreeCourse.jpg"
 *   }
 * ]
 */

/**
 * @api {get} /courses/:id Get a specific course
 * @apiName getCoursesById
 * @apiGroup Courses
 * @apiDescription Gets a specific course that matches given id.
 * @apiParam {String} id Unique ID used for the course to fetch
 * @apiSuccess {String} id Course id
 * @apiSuccess {String} title Course title
 * @apiSuccess {String} provider Course provider
 * @apiSuccess {String} url Course url
 * @apiSuccess {String} imageUrl Course image url
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "id": "643e40d0d1e93c81f60dda71",
 *     "title": "Google Cloud Digital Leader Training Course | Free Courses | Udacity",
 *     "description": "Take Udacity's free Cloud Digital Leader Training Course by Google and gain foundational knowledge of cloud technology and data. Learn online with Udacity.",
 *     "provider": "udacity",
 *     "url": "https://www.udacity.com/course/google-cloud-digital-leader-training--ud301",
 *     "imageUrl": "https://www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/3NeA5a2O7EaizguZRT1X76/46da849095bf11094420ef104505b807/Google_Digital_Leader_FreeCourse.jpg"
 *  }
 */
