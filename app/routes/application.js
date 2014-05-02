import getJson from '../utils/get-json';

export default Ember.Route.extend({
  beforeModel: function() {
    // Set up development variables
    window.store = this.store;
    window.route = this;
  },
  model: function() {
    var self = this;
    var maxIpms = 10;
    var numberOfResolvedPromises = 0;
    return Ember.RSVP.all([
      // Load Cloud Controller APIs
      this.store.find('cloudController', 'current'),
      this.store.find('vm'),
      // Load Fuel APIs
      this.store.find('cluster'),
      this.store.find('fuelNode'),
      this.store.find('notification'),
      this.store.find('release'),
      this.store.find('task'),
      this.store.find('version', 'current')
    ]).then(function() {
      // Discover locations of IPMs
      var allPromises = [];
      function findIpm(ipmName) {
        return getJson('/' + ipmName + '/api/v1/statuses.json').then(function(response) {
          // If IPM was found, add record to store
          var ipm = self.store.push('ipm', {
            id: ipmName,
            name: ipmName,
            links: {
              statuses: '/' + ipmName + '/api/v1/statuses.json',
              nodes: '/' + ipmName + '/api/v1/nodes.json',
              netconfig: '/' + ipmName + '/api/v1/netconfig.json',
              networkType: '/' + ipmName + '/api/v1/network_types.json'
            }
          });
          // Load SAA APIs for this IPM
          return Ember.RSVP.all([
            ipm.get('statuses'),
            ipm.get('nodes'),
            ipm.get('netconfig'),
            ipm.get('networkType')
          ]);
        }).always(function() {
          // After checking all possible IPM locations
          if (++numberOfResolvedPromises === maxIpms) {
            // Check for matching IP addresses for fuel and SAA nodes
            self.store.all('ipm').forEach(function(ipm) {
              var ips = self.store.all('node').filterBy('ipm.id', ipm.get('id')).filterBy('ids.ip_address').mapBy('ids.ip_address');
              self.store.all('fuelNode').forEach(function(fuelNode) {
                var ipExists = !Ember.isEmpty(fuelNode.get('network_data')) && fuelNode.get('network_data').findBy('name', 'management') && fuelNode.get('network_data').findBy('name', 'management').ip;
                var fuelIp = ipExists && fuelNode.get('network_data').findBy('name', 'management').ip.split('/')[0];
                var isMatch = ips.indexOf(fuelIp) !== -1;
                // Add relationship from matching fuel node's cluster to SAA node's IPM
                if (isMatch) ipm.set('cluster', fuelNode.get('cluster'));
              });
            });
          }
          return new Ember.RSVP.resolve();  // Resolve all promises so route isn't blocked
        });
      }
      for (var i = 1; i <= maxIpms; i++) {
        var ipmName = 'ipm' + ('0' + i).slice(-2);
        allPromises.push(findIpm(ipmName));
      }
      return new Ember.RSVP.allSettled(allPromises);
    });
  }
});
