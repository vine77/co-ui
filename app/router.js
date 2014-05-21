var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
   this.route("orchestration", { path: "/orchestration" });
});

export default Router;
