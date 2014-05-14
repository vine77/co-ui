export default Ember.Route.extend({
  beforeModel: function() {
    // Set up development variables
    window.store = this.store;
    window.route = this;
  },
  model: function() {
    var self = this;
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
      this.store.find('ipm').then(function(ipms) {
        ipms.forEach(function(ipm) {
          ipm.get('statuses');
          ipm.get('nodes');
          ipm.get('netconfig');
          ipm.get('networkType');
        });
      })
    ]);
  }
});
