var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.resource('app', function() {
    this.route('dashboard');
    this.route('control-panel');
  });
  this.route('orchestration');
  this.route('horizon');
  this.resource('ingredient', function() {
    this.route('dashboard');
    this.route('nodes');
    this.route('vms');
    this.route('services');
    this.route('trust');
    this.route('settings');
  });
  this.route('logs');
  this.route('login');
  //this.route('profile');
  this.route('profile', {path: '/profiles/:user_id'});
  this.route('about');
});

export default Router;
