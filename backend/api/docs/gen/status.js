/**
 * @api {get} /status Get status of the API
 * @apiName getStatus
 * @apiGroup Status
 * @apiDescription Retrieves the status of the API
 * particularly the db and redis connections status
 * @apiSuccess {Boolean} db Database connection status
 * @apiSuccess {Boolean} redis Redis connection status
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "db": true,
 *    "redis": true
 * }
 */

/**
 * @api {get} /status Get statistics on courses
 * @apiName getStats
 * @apiGroup Status
 * @apiDescription Retrieves the status of the API
 * particularly the db and redis connections status
 * @apiSuccess {Number} categories Count of categories
 * @apiSuccess {Number} subcategories Count of subcategories
 * @apiSuccess {Number} courses Count of courses
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "categories": 11,
 *    "subcategories": 41,
 *    "courses": 567
 * }
 */
