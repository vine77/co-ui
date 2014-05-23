import authenticatedRoute from './authenticated';

export default authenticatedRoute.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('cloudController').set('model', this.store.getById('cloudController', 'current'));
    this.controllerFor('vms').set('model', this.store.all('vm'));
    this.controllerFor('clusters').set('model', this.store.all('cluster'));
    this.controllerFor('ipms').set('model', this.store.all('ipm'));
  },
  model: function() {
    var self = this;
    return Ember.RSVP.all([
      // Load Cloud Controller APIs
      this.store.find('cloudController', 'current'),
      this.store.find('vm'),
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
