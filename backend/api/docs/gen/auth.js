// Authentication endpoints
/**
 * @api {post} /auth/login Login
 * @apiName postLogin
 * @apiGroup Authentication
 * @apiDescription Logs in user using their email and password
 * and generates a token for further authentication in restricted paths.
 * User authentication tokens expires after 24 hours.
 * @apiUse MissingEmail
 * @apiUse MissingPassword
 * @apiBody {String} email User email
 * @apiBody {String} password User password
 * @apiSuccess {String} token User authentication token
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
 * @apiDescription Logs out user.
 * @apiUse XToken
 * @apiUse Unauthorized
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 *
 */

/**
 * @api {get} /auth/verify-email Get email verification token
 * @apiName getEmailToken
 * @apiGroup Authentication
 * @apiDescription Generates a user email authentication token.
 * Emails verification tokens are sent to the user's email and expire after 48 hours.
 * @apiUse XToken
 * @apiUse Unauthorized
 * @apiSuccess {String} id User id
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 */

/**
 * @api {put} /auth/verify-email/:userId/:token Verify user email
 * @apiName putVerifyEmail
 * @apiGroup Authentication
 * @apiDescription Verifies user email based on their user id and email verification token.
 * @apiUse Unauthorized
 * @apiParam {String} userId User id
 * @apiParam {String} token Email verification token
 * @apiSuccess {Boolean} verified User verification status
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "verified": true,
 * }
 */

/**
 * @api {post} /auth/reset-password Generate password reset token
 * @apiName postResetPassword
 * @apiGroup Authentication
 * @apiDescription Generates a reset token for a user that is
 * not logged in and has forgotten their password. Password reset tokens
 * are sent to user's email and expire after 48 hours.
 * @apiUse MissingEmail
 * @apiUse NotFound
 * @apiBody {String} email User email
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 */

/**
 * @api {put} /auth/reset-password/:userId/:token Reset password
 * @apiName putResetPassword
 * @apiGroup Authentication
 * @apiDescription Resets user's password if they are
 * not logged in and have forgotten their password. Requires user id and
 * password reset token.
 * @apiUse Unauthorized
 * @apiUse MissingPassword
 * @apiParam {String} userId User id
 * @apiParam {String} token Password reset token
 * @apiBody {String} password New user password
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 */
