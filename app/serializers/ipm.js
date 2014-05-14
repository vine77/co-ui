export default DS.RESTSerializer.extend({
  normalize: function(type, hash, prop) {
    // Add locations for SAA API relationships
    hash.links = {
      statuses: "/ipm01/api/v1/statuses.json",
      nodes: "/ipm01/api/v1/nodes.json",
      netconfig: "/ipm01/api/v1/netconfig.json",
      networkType: "/ipm01/api/v1/network_types.json"
    };
    return this._super(type, hash, prop);
  }
});
