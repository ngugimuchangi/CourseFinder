// Type definitions
/**
 * @apiDefine XToken Token header not present
 * @apiHeader {String} X-Token User authentication token
 */

/**
 * @apiDefine UserSuccessParams
 * @apiSuccess {String} id User id
 * @apiSuccess {String} email User email
 * @apiSuccess {Boolean} user email verification status
 * @apiSuccess {Array} topics List of topics of interest to user
 * @apiSuccess {Array} bookmarks List of bookmarked courses
 */

/**
 * @apiDefine Unauthorized
 * @apiError (Error 401) Unauthorized Only authenticated users can access the data
 * @apiErrorExample {json} Unauthorized
 * HTTP/1.1 401 Unauthorized
 * {
 *  "error": "Unauthorized"
 * }
 */

/**
 * @apiDefine MissingEmail
 * @apiError (Error 400) MissingEmail User email was not provided in the request
 * @apiErrorExample {json} MissingEmail
 * HTTP/1.1 400 Bad Request
 * {
 *  "error": "Missing email"
 * }
 */

/**
 * @apiDefine MissingPassword
 * @apiError (Error 400) MissingPassword User password was not provided in the request
 * @apiErrorExample {json} MissingPassword
 * HTTP/1.1 400 Bad Request
 * {
 *  "error": "Missing password"
 * }
 */

/**
 * @apiDefine NotFound
 * @apiError (Error 404) NotFound Resource not found
 * @apiErrorExample {json} NotFound
 * HTTP/1.1 404 Not Found
 * {
 *  "error": "Not found"
 * }
 */

/**
 * @apiDefine MissingCourseId
 * @apiError (Error 400) MissingCourseId Course id is not provide in request
 * @apiErrorExample MissingCourseId
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": "Missing course id"
 * }
 */

/**
 * @apiDefine InvalidCourseId
 * @apiError (Error 400) InvalidCourseId Course id is in wrong format
 * @apiErrorExample InvalidCourseId
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": "Invalid course id"
 * }
 */

/**
 * @apiDefine MissingTopic
 * @apiError (Error 400) Topic Topic is not provide in request
 * @apiErrorExample MissingTopic
 * HTTP/1.1 400 Bad Request
 * {
 *   "error": "Missing Topic"
 * }
 */
