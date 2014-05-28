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
  }
});
