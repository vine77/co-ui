var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.route('orchestration');
  this.route('saa-appliance');
  this.route('login');
  this.resource('app', function() {
    this.route('control-panel');
    this.route('dashboard');
  });
});

export default Router;
