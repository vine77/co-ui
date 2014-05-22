export default Ember.Route.extend({
  beforeModel: function() {
    // Set up development variables
    window.store = this.store;
    window.route = this;
  },
  actions: {
    goToInfrastructure: function() {
      this.transitionTo('app.control-panel');
      this.controllerFor('app/control-panel').set('viewName', 'infrastructure');
    },
    goToClouds: function() {
      this.transitionTo('app.control-panel');
      this.controllerFor('app/control-panel').set('viewName', 'clouds');
    }
  }
});
