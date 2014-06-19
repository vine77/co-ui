import authenticatedRoute from './authenticated';

export default authenticatedRoute.extend({
  refreshInterval: 15, // in seconds
  model: function() {
    return this.loadModels();
  },
  afterModel: function() {
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
          ipm.get('statuses').then(function(statuses) {
            // Reload relationship links for SAA Statuses API
            statuses.reloadLinks();
            // TODO: clear statuses if reloadLinks() fails
          }, function(xhr) {
            // Reset rejected promise
            if (ipm.get('statuses')) ipm.get('statuses').clear();
            ipm._relationships.statuses = null;
            ipm.get('statuses');  // Reload
          });
          ipm.get('nodes');
          ipm.get('netconfig');
          ipm.get('networkType');
        });
      })
    ]).then(function() {
      return Ember.RSVP.allSettled([
        // Load Fuel APIs (don't block on failure via allSettled)
        self.store.find('cluster').then(function() {
          self.fixRelationship({belongsTo: 'cluster', hasMany: 'ipm'});
          self.fixRelationship({belongsTo: 'cluster', hasMany: 'fuelNode'});
        }),
        self.store.find('fuelNode').then(function() {
          self.fixRelationship({belongsTo: 'cluster', hasMany: 'fuelNode'});
        }),
        self.store.find('release'),
        //self.store.find('notification'),
        //self.store.find('task'),
        self.store.find('version', 'current'),
      ]);
    });
  },
  reloadModels: function() {
    Ember.run.later(this, 'reloadModels', this.refreshInterval * 1000);
    var isAppRoute = this.controllerFor('application').get('currentPath').split('.')[0] === 'app';
    var isLoggedIn = this.controllerFor('login').get('isLoggedIn');
    if (isAppRoute && isLoggedIn) this.loadModels();
  },
  fixRelationship: function(options) {
    var self = this;
    if (options.belongsTo === undefined || options.hasMany === undefined) return;
    this.store.all(options.belongsTo).forEach(function(belongsToItem) {
      var belongsToItems = [];
      self.store.all(options.hasMany).forEach(function(hasManyItem) {
        belongsToItems.push(hasManyItem.get(options.belongsTo));
      });
      Ember.RSVP.allSettled(belongsToItems).then(function() {
        var hasManyItems = self.store.all(options.hasMany).filterBy(options.belongsTo + '.id', belongsToItem.get('id'));
        belongsToItem.get(options.hasMany.pluralize()).then(function(hasManyPromises) {
          hasManyPromises.setObjects(hasManyItems);
        });
      });
    });
  }
});
