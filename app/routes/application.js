export default Ember.Route.extend({
  beforeModel: function() {
    // Set up development variables
    window.store = this.store;
    window.route = this;
  },
  model: function() {
    return Ember.RSVP.all([
      // Load Fuel APIs
      this.store.find('cluster'),
      this.store.find('fuelNode'),
      this.store.find('notification'),
      this.store.find('release'),
      this.store.find('task'),
      this.store.find('version', 'current'),
      // Load Cloud Controller APIs
      this.store.find('cloudController', 'current'),
      this.store.find('vm'),
      this.store.find('ipm')
    ]).then(function() {
      // Discover locations of IPMs
      var allPromises = [];
      return new Ember.RSVP.allSettled(allPromises);
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('vms').set('model', this.store.all('vm'));
  }
});
