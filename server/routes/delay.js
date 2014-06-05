module.exports = function(app) {
  var pause = require('connect-pause');
  app.use(pause(500));
};
