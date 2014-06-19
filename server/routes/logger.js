module.exports = function(app) {
  app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
  });
};
