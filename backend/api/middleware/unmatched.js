/**
 * Custom response for unmatched routes
 * @param {object} error - error object
 * @param {import('express').Request} _req - request object
 * @param {import('express').Response} res - response object
 */
function unmatchedRoutes(req, res) {
  if (req.method.toLowerCase() === 'options') res.end();
  else res.status(404).json({ error: 'Not found' });
}

export default unmatchedRoutes;
