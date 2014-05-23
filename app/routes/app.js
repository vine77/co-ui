export default Ember.Route.extend({
  model: function() {
    var self = this;
    return Ember.RSVP.all([
      // Load IPM APIs
      this.store.find('ipm').then(function(ipms) {
        // Load SAA APIs (don't block on failure)
        ipms.forEach(function(ipm) {
          ipm.get('statuses');
          ipm.get('nodes');
          ipm.get('netconfig');
          ipm.get('networkType');
        });
      })
    ]).then(function() {
      return Ember.RSVP.allSettled([
        // Load Fuel APIs (don't block on failure)
        self.store.find('cluster'),
        self.store.find('fuelNode'),
        self.store.find('notification'),
        self.store.find('release'),
        self.store.find('task'),
        self.store.find('version', 'current'),
      ]);
    });
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
