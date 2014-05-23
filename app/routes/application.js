export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('cloudController').set('model', this.store.getById('cloudController', 'current'));
    this.controllerFor('vms').set('model', this.store.all('vm'));
    this.controllerFor('clusters').set('model', this.store.all('cluster'));
    this.controllerFor('ipms').set('model', this.store.all('ipm'));
  },
  beforeModel: function() {
    // Set up development variables
    window.store = this.store;
    window.route = this;
  },
  model: function() {
    var self = this;
    return Ember.RSVP.all([
      // Load Cloud Controller and VM APIs
      this.store.find('cloudController', 'current'),
      this.store.find('vm')
    ]);
  },
  actions: {
    goToDashboard: function() {
      this.transitionTo('app.dashboard');
    },
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
