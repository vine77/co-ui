import authenticatedRoute from './authenticated';

export default authenticatedRoute.extend({
  model: function() {
    var self = this;
    return Ember.RSVP.all([
      // Load Cloud Controller and VM APIs
      this.store.find('cloudController', 'current'),
      this.store.find('vm'),
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
    this.store.all('cluster').forEach(function(cluster) {
      var nodeClusters = [];
      var ipmClusters = [];
      self.store.all('fuelNode').forEach(function(node) {
        nodeClusters.push(node.get('cluster'));
      });
      Ember.RSVP.allSettled(nodeClusters).then(function() {
        var fuelNodes = self.store.all('fuelNode').filterBy('cluster.id', cluster.get('id'));
        cluster.get('fuelNodes').then(function(promiseNodes) {
          promiseNodes.setObjects(fuelNodes);
        });
      });
      self.store.all('ipm').forEach(function(ipm) {
        ipmClusters.push(ipm.get('cluster'));
      });
      Ember.RSVP.allSettled(ipmClusters).then(function() {
        var ipms = self.store.all('ipm').filterBy('cluster.id', cluster.get('id'));
        cluster.get('ipms').then(function(promiseIpms) {
          promiseIpms.setObjects(ipms);
        });
      });
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('cloudController').set('model', this.store.getById('cloudController', 'current'));
    this.controllerFor('vms').set('model', this.store.all('vm'));
    this.controllerFor('clusters').set('model', this.store.all('cluster'));
    this.controllerFor('ipms').set('model', this.store.all('ipm'));
  }
});
