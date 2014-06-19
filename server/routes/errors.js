module.exports = function(app) {
  app.use(function(req, res, next) {
    if (req.method === 'PUT' && req.url === '/api/v1/mailservers/default.json') {
      res.send('{"error": "An error occurred"}', 422);
    } else {
      next();
    }
  });
};
