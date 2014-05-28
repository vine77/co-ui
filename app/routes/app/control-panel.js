import authenticatedRoute from '../authenticated';

export default authenticatedRoute.extend({
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
