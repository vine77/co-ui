export default Ember.Route.extend({
  beforeModel: function() {
    // Set up development variables
    window.store = this.store;
    window.route = this;
  },
  actions: {
    goToInfrastructure: function() {
      this.transitionTo('index');
      this.controllerFor('index').set('viewName', 'infrastructure');
    },
    goToClouds: function() {
      this.transitionTo('index');
      this.controllerFor('index').set('viewName', 'clouds');
    }
  }
});
