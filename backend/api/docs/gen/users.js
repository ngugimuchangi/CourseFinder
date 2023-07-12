// Users endpoints
/**
 * @api {post} /users Create new user
 * @apiName postUser
 * @apiGroup Users
 * @apiDescription Creates a new user with given email and password.
 * @apiUse MissingEmail
 * @apiUse MissingPassword
 * @apiBody {String} email User email
 * @apiBody {String} password User password
 * @apiSuccess (Success 201) {String} id User id
 * @apiSuccess (Success 201) {String} email User email
 * @apiSuccess (Success 201) {Boolean} user email verification status
 * @apiSuccess (Success 201) {Array} topics List of topics of interest to user
 * @apiSuccess (Success 201) {Array} bookmarks List of bookmarked courses
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 * {
 *   "id": "643f78560c0ffbdafb2f3521".
 *   "email": "test.user@mail.com",
 *   "verified": false,
 *   "topics": [],
 *   "bookmarks": []
 * }
 * @apiError (Error 409) AlreadyExists User already exists
 * @apiErrorExample AlreadyExists
 * HTTP/1.1 409 Conflict
 * {
 *   "error": "User already exists"
 * }
 */

/**
 * @api {get} /users/me Get user details
 * @apiName getUser
 * @apiGroup Users
 * @apiDescription Endpoint for retrieving user details.
 * @apiUse XToken
 * @apiUse Unauthorized
 * @apiUse UserSuccessParams
 * @apiBody {String} email User email
 * @apiBody {String} password User password
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "643f78560c0ffbdafb2f3521",
 *   "email": "test.user@mail.com",
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
 * @apiUse Unauthorized
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
 * @api {put} /users/me/bookmarks Add and delete bookmarks
 * @apiName putBookmarks
 * @apiGroup Users
 * @apiDescription Adds a course to or deletes it from the list of bookmarks based
 * on action parameter.
 * belonging to a user
 * @apiUse XToken
 * @apiUse MissingCourseId
 * @apiUse NotFound
 * @apiUse Unauthorized
 * @apiUse UserSuccessParams
 * @apiQuery {String='add','del'} action Action to perform on bookmark. `add` initiates bookmark
 * addition to the user's list of bookmark. `del` initiates deletion of a topic from the
 * list of bookmarks
 * @apiBody {String} courseId ID of course to bookmark
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "643f78560c0ffbdafb2f3521",
 *   "email": "test.user@mail.com",
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
 * @api {put} /users/me/topics Add and delete user topics
 * @apiName putUserTopics
 * @apiGroup Users
 * @apiDescription Adds a category of interest to the list
 * of user topics
 * @apiUse XToken
 * @apiUse MissingTopic
 * @apiUse Unauthorized
 * @apiQuery {String='add','del'} action Action to perform on topic. `add` initiates topic
 * addition to the user's list of topics. `del` initiates deletion of a topic from the
 * list of topics
 * @apiUse UserSuccessParams
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "643f78560c0ffbdafb2f3521",
 *   "email": "test.user@mail.com",
 *   "verified": true,
 *   "topics": ["Web Development", "Databases", "Career Development", "Art & Crafts"],
 *   "bookmarks": [
 *       "bookmarks": [
 *       "/courses/643e4102d1e93c81f60dda95",
 *       "/courses/643e4102d1e93c81f60dda95"
 *     ]
 *  }
 * @apiError (Error 400) MissingAction `action` query parameter is not provider
 * @apiErrorExample MissingAction
 * HTTP/1.1 400 Bad Request
 * {
 *    "error": "Missing action parameter"
 * }
 *
 * @apiError (Error 400) InvalidAction `action` query parameter doesn't match allowed values
 * @apiErrorExample InvalidAction
 * HTTP/1.1 400 Bad Request
 * {
 *    "error": "Invalid action"
 * }
 */

/**
 * @api {put} /users/me/email Change user email
 * @apiName putEmail
 * @apiGroup Users
 * @apiDescription Allows logged in user to change their email and receive
 * a verification token in their email
 * of user topics
 * @apiUse XToken
 * @apiUse MissingEmail
 * @apiUse Unauthorized
 * @apiUse UserSuccessParams
 * @apiError (409) AccountExists New email already associated with a user account
 * @apiErrorExample AccountExists
 * HTTP/1.1 409 Conflict
 * {
 *   "error": "An account with this email already exists"
 * }
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "643f78560c0ffbdafb2f3521",
 *   "email": "test.user@mail.com",
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
 * @apiDescription Enables logged in user to update their password
 * of user topics
 * @apiUse XToken
 * @apiUse MissingPassword
 * @apiUse Unauthorized
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
 * @apiUse Unauthorized
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 */
