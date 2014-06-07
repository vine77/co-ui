import authenticatedRoute from './authenticated';

export default authenticatedRoute.extend({
  refreshInterval: 25, // in seconds
  model: function() {
    return this.loadModels();
  },
  afterModel: function() {
    this.addRelationships();
    Ember.run.later(this, 'reloadModels', this.refreshInterval * 1000);
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('cloudController').set('model', this.store.getById('cloudController', 'current'));
    this.controllerFor('vms').set('model', this.store.all('vm'));
    this.controllerFor('clusters').set('model', this.store.all('cluster'));
    this.controllerFor('ipms').set('model', this.store.all('ipm'));

  },
  loadModels: function() {
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
  reloadModels: function() {
    var self = this;
    Ember.run.later(this, 'reloadModels', this.refreshInterval * 1000);
    if (this.controllerFor('application').get('currentPath').split('.')[0] === 'app') {
      this.loadModels().then(function() {
        return self.addRelationships();
      });
      // Reload relationship links for SAA Statuses API
      this.store.all('cluster').forEach(function(cluster) {
        if (cluster.get('ipms.firstObject')) {
          cluster.get('ipms.firstObject.statuses').then(function(statuses) {
            statuses.reloadLinks();
          });
        }
      });
    }
  },
  addRelationships: function() {
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
  }
});
