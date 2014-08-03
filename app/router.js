import Ember from 'ember';

var Router = Ember.Router.extend({
  location: CoUiENV.locationType
});

Router.map(function() {
  this.resource('app', function() {
    this.route('dashboard');
    this.route('control-panel');
    this.route('orchestration');
    this.route('ingredient');
    this.route('horizon');
    this.route('logs');
    this.route('about');
  });
  this.route('login');
  this.route('reset-password');
  this.resource('settings', function() {
    this.route('user');
    this.route('mail');
  });
  //this.route('profile');
  this.route('profile', {path: '/profiles/:user_id'});
  this.route('cgroups');
});

export default Router;
