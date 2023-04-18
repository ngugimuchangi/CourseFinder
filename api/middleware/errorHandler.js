/* eslint no-unused-vars: 0 */// --> OFF
/**
   * Custom error handler
   * @param {object} error - error object
   * @param {import('express').Request} _req - request object
   * @param {import('express').Response} res - response object
   * @param {import('express').NextFunction} next - next function
   */
function errorHandler(error, _req, res, _next) {
  const status = error.statusCode || 500;
  const message = error.statusCode < 500 ? error.message : 'Something went wrong';
  res.status(status).json({ error: message });
  console.error(error.stack);
}

export default errorHandler;
