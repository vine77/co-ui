var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
   this.route('orchestration', {path: '/orchestration'});
   this.route('saa-appliance', {path: '/saa-appliance'});
});

export default Router;
