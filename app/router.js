var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
  this.resource('app', function() {
    this.route('dashboard');
    this.route('control-panel');
    this.route('ingredient');
    this.route('horizon');
  });
  this.route('orchestration');
  this.route('logs');
  this.route('login');
  //this.route('profile');
  this.route('profile', {path: '/profiles/:user_id'});
  this.route('about');
});

export default Router;
