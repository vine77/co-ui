export default Ember.Route.extend({
  beforeModel: function() {
    // Set up development variables
    window.store = this.store;
    window.route = this;
  },
  actions: {
    goToInfrastructure: function() {
      this.transitionTo('index');
      this.controllerFor('index').set('viewClass', 'infrastructure-view');
    },
    goToClouds: function() {
      this.transitionTo('index');
      this.controllerFor('index').set('viewClass', 'clouds-view');
    }
  }
});
