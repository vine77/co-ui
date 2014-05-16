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
        var promises = [];
        ipms.forEach(function(ipm) {
          promises.push(ipm.get('statuses'));
          promises.push(ipm.get('nodes'));
          promises.push(ipm.get('netconfig'));
          promises.push(ipm.get('networkType'));
        });
        return Ember.RSVP.all(promises);
      })
    ]);
  },
  afterModel: function() {
    // Manually add relationships (until Ember Data single-source-of-truth branch is merged)
    var self = this;
    Ember.run.next(this, function() {
      this.store.all('cluster').forEach(function(cluster) {
        var fuelNodes = self.store.all('fuelNode').filterBy('cluster.id', cluster.get('id'));
        var ipms = self.store.all('ipm').filterBy('cluster.id', cluster.get('id'));
        window.ipms = ipms;
        cluster.get('fuelNodes').then(function(promiseNodes) {
          promiseNodes.setObjects(fuelNodes);
        });
        cluster.get('ipms').then(function(promiseIpms) {
          promiseIpms.setObjects(ipms);
        });
      });
    });
  }
});
