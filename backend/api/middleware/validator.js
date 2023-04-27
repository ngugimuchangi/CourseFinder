import redisClient from '../utils/redis';
import User from '../models/user';
/**
 * Validates login token
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} Next
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param {Next} next - next function
 */
async function authTokenValidator(req, res, next) {
  const userPaths = /^\/users\/me(\/email|\/password|\/topics|\/bookmarks)?\/?$/;
  const authPaths = /^\/auth\/(logout|verify-email)\/?$/;

  if (!userPaths.test(req.path) && !authPaths.test(req.path)) {
    return next();
  }
  let user;
  const token = req.get('X-Token');
  const userId = await redisClient.getUserId(token);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  try {
    user = await User.findById(userId).populate('bookmarks');
  } catch (error) {
    return next(error);
  }
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  req.user = user;
  return next();
}

export default authTokenValidator;
