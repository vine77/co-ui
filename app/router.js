var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.route('orchestration');
  this.route('saa-appliance');
  this.route('logs');
  this.route('login');
  this.route('about');
  this.resource('app', function() {
    this.route('control-panel');
    this.route('dashboard');
  });
});

export default Router;
