/**
 * Types
 * @apiDefine XToken
 * @apiHeader {String} X-Token User authentication token
 */

/**
 * @api {post} /auth/login Login
 * @apiName postLogin
 * @apiGroup Authentication
 * @apiDescription Logs in user into the API using their email and password
 * and generates a token for further authentication in restricted paths.
 * User authentication tokens expires after 24 hours.
 * @apiBody {String} email User's email
 * @apiBody {String} password User's password
 * @apiSuccess {String} token User's authentication token
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "token": "d00e18607d3ee6af2d0f0523e50938bc38577c6b07f5028a4b92ece5b9ab1483"
 * }
 */

/**
 * @api {get} /auth/logout Logout
 * @apiName getLogout
 * @apiGroup Authentication
 * @apiDescription Logs out user from the API.
 * @apiUse XToken
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 *
 */

/**
 * @api {post} /auth/verify-email Get email verification token
 * @apiName postEmailToken
 * @apiGroup Authentication
 * @apiDescription Endpoint for requesting user's email authentication token.
 * Emails verification tokens are sent to user's email and expire after 48 hours.
 * @apiUse XToken
 * @apiBody {String} email User's email
 * @apiSuccess {String} id User'id
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 */

/**
 * @api {get} /auth/verify-email/:userId/:token Verify user email
 * @apiName verifyEmail
 * @apiGroup Authentication
 * @apiDescription Endpoint for verifying user's.
 * @apiParam {String} userId User's unique ID
 * @apiParam {String} token Email verification token
 * @apiSuccess {Boolean} verified User verification status
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "verified": true,
 * }
 */

/**
 * @api {post} /auth/reset-password Get password reset token
 * @apiName postResetPassword
 * @apiGroup Authentication
 * @apiDescription Endpoint generating a reset token for a user that is
 * not logged in and have forgotten their password. Password reset tokens
 * are sent to user's email and expire after 48 hours.
 * @apiBody {String} email User's email
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 */

/**
 * @api {put} /auth/reset-password/:userId/:token Reset password
 * @apiName putResetPassword
 * @apiGroup Authentication
 * @apiDescription Endpoint for resetting user's password if they are
 * not logged in and have forgotten their password.
 * @apiParam {String} userId User's unique ID
 * @apiParam {String} token Password reset token
 * @apiBody {String} password New user password
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 */
