export default DS.RESTSerializer.extend({
  normalize: function(type, hash, prop) {
    // Add locations for SAA API relationships
    hash.apiDirectory = 'ipm' + ('0' + hash.id).slice(-2);
    hash.links = {
      statuses: '/' + hash.apiDirectory + '/api/v1/statuses.json',
      nodes: '/' + hash.apiDirectory + '/api/v1/nodes.json',
      netconfig: '/' + hash.apiDirectory + '/api/v1/netconfig.json',
      networkType: '/' + hash.apiDirectory + '/api/v1/network_types.json'
    };
    return this._super(type, hash, prop);
  }
});
