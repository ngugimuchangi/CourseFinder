/**
 * Types
 * @apiDefine UserSuccessParams
 * @apiSuccess {String} id User'id
 * @apiSuccess {String} email User'email
 * @apiSuccess {Boolean} user email verification status
 * @apiSuccess {Array} topics List of topics of interest to user
 * @apiSuccess {Array} bookmarks List of bookmarked courses
 */

/**
 * @api {post} /users Create new user
 * @apiName postUser
 * @apiGroup Users
 * @apiDescription Creates a new user with given email and password.
 * @apiUse XToken
 * @apiBody {String} email User's email
 * @apiBody {String} password User's password
 * @apiSuccess (Success 201) {String} id User'id
 * @apiSuccess (Success 201) {String} email User'email
 * @apiSuccess (Success 201) {Boolean} user email verification status
 * @apiSuccess (Success 201) {Array} topics List of topics of interest to user
 * @apiSuccess (Success 201) {Array} bookmarks List of bookmarked courses
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 * {
 *   "id": "643f78560c0ffbdafb2f3521".
 *   "email": "",
 *   "verified": false,
 *   "topics": [],
 *   "bookmarks": []
 * }
 */

/**
 * @api {get} /users/me Get user details
 * @apiName getUser
 * @apiGroup Users
 * @apiDescription Endpoint for retrieving user details.
 * @apiUse XToken
 * @apiUse UserSuccessParams
 * @apiBody {String} email User's email
 * @apiBody {String} password User's password
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "643f78560c0ffbdafb2f3521",
 *   "email": "tech.curious14@gmail.com",
 *   "verified": true,
 *   "topics": ["Web Development", "Databases", "Art & Crafts"],
 *   "bookmarks": [
 *       "bookmarks": [
 *       "/courses/643e40d0d1e93c81f60dda71",
 *       "/courses/643e4102d1e93c81f60dda95"
 *     ]
 *  }
 */

/**
 * @api {get} /users/me/bookmarks Get user bookmarks
 * @apiName getBookmarks
 * @apiGroup Users
 * @apiDescription Get detailed list of all bookmarks belonging to a user.
 * @apiUse XToken
 * @apiSuccess {Number} count Total count of bookmarks
 * @apiSuccess {Array} bookmarks List of bookmarked courses
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "count": 2,
 *   "bookmarks": [
 *       {
 *           "id": "643e40d0d1e93c81f60dda71",
 *           "title": "Google Cloud Digital Leader Training Course | Free Courses | Udacity",
 *           "description": "Take Udacity's free Cloud Digital Leader Training Course by Google and gain foundational knowledge of cloud technology and data. Learn online with Udacity.",
 *           "provider": "udacity",
 *           "url": "https://www.udacity.com/course/google-cloud-digital-leader-training--ud301",
 *           "imageUrl": "https://www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/3NeA5a2O7EaizguZRT1X76/46da849095bf11094420ef104505b807/Google_Digital_Leader_FreeCourse.jpg"
 *       },
 *       {
 *           "id": "643e4102d1e93c81f60dda95",
 *           "title": "Agile with Atlassian Jira",
 *           "description": "Offered by Atlassian. This course discusses common foundational principles and practices used by agile methodologies, providing you with a ... Enroll for free.",
 *           "provider": "coursera",
 *           "url": "https://www.coursera.org/learn/agile-atlassian-jira",
 *           "imageUrl": "https://s3.amazonaws.com/coursera_assets/meta_images/generated/XDP/XDP~COURSE!~agile-atlassian-jira/XDP~COURSE!~agile-atlassian-jira.jpeg"
 *       }
 *     ]
 *  }
 */

/**
 * @api {put} /users/me/bookmarks/ Add bookmarks
 * @apiName putBookmarks
 * @apiGroup Users
 * @apiDescription Adds a course and adds it to the list of bookmarks
 * belonging to a user
 * @apiUse XToken
 * @apiUse UserSuccessParams
 * @apiBody {String} courseId ID of course to bookmark
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "643f78560c0ffbdafb2f3521",
 *   "email": "tech.curious14@gmail.com",
 *   "verified": true,
 *   "topics": ["Web Development", "Databases", "Art & Crafts"],
 *   "bookmarks": [
 *       "bookmarks": [
 *       "/courses/643e40d0d1e93c81f60dda71",
 *       "/courses/643e4102d1e93c81f60dda95"
 *     ]
 *  }
 */

/**
 * @api {delete} /users/me/bookmarks/:courseId Delete bookmarks
 * @apiName deleteBookmarks
 * @apiGroup Users
 * @apiDescription Deletes a course from the list of bookmarks
 * belonging to a user
 * @apiUse XToken
 * @apiUse UserSuccessParams
 * @apiParam {String} courseId ID of course to remove from bookmarks
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "id": "643f78560c0ffbdafb2f3521",
 *   "email": "tech.curious14@gmail.com",
 *   "verified": true,
 *   "topics": ["Web Development", "Databases", "Art & Crafts"],
 *   "bookmarks": [
 *       "bookmarks": [
 *       "/courses/643e4102d1e93c81f60dda95"
 *     ]
 *  }
 */

/**
 * @api {put} /users/me/topics Add topics
 * @apiName putUserTopic
 * @apiGroup Users
 * @apiDescription Adds a category of interest to the list
 * of user topics
 * @apiUse XToken
 * @apiUse UserSuccessParams
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "id": "643f78560c0ffbdafb2f3521",
 *   "email": "tech.curious14@gmail.com",
 *   "verified": true,
 *   "topics": ["Web Development", "Databases", "Career Development", "Art & Crafts"],
 *   "bookmarks": [
 *       "bookmarks": [
 *       "/courses/643e4102d1e93c81f60dda95",
 *       "/courses/643e4102d1e93c81f60dda95"
 *     ]
 *  }
 */

/**
 * @api {delete} /users/me/topics/:topic Delete topics
 * @apiName deleteUserTopic
 * @apiGroup Users
 * @apiDescription Deletes a course topic from the list
 * of user topics
 * @apiUse XToken
 * @apiUse UserSuccessParams
 * @apiParam {String} topic Topic to delete from list of topics
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "id": "643f78560c0ffbdafb2f3521",
 *   "email": "tech.curious14@gmail.com",
 *   "verified": true,
 *   "topics": ["Web Development", "Career Development", "Art & Crafts"],
 *   "bookmarks": [
 *       "bookmarks": [
 *       "/courses/643e4102d1e93c81f60dda95",
 *       "/courses/643e4102d1e93c81f60dda95"
 *     ]
 *  }
 */

/**
 * @api {put} /users/me/email Change user email
 * @apiName putEmail
 * @apiGroup Users
 * @apiDescription Allows logged in user to change their email and receive
 * a verification token in their email
 * of user topics
 * @apiUse XToken
 * @apiUse UserSuccessParams
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "id": "643f78560c0ffbdafb2f3521",
 *   "email": "tech.curious14@gmail.com",
 *   "verified": false,
 *   "topics": ["Web Development", "Career Development", "Art & Crafts"],
 *   "bookmarks": [
 *       "bookmarks": [
 *       "/courses/643e4102d1e93c81f60dda95",
 *       "/courses/643e4102d1e93c81f60dda95"
 *     ]
 *  }
 */

/**
 * @api {put} /users/me/password Change user password
 * @apiName putPassword
 * @apiGroup Users
 * @apiDescription Allows logged in user to update their password
 * of user topics
 * @apiUse XToken
 * @apiUse UserSuccessParams
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 */

/**
 * @api {delete} /users/me Delete user
 * @apiName deleteUser
 * @apiGroup Users
 * @apiDescription Deletes a user account
 * of user topics
 * @apiUse XToken
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 */
