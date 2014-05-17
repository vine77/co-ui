export default DS.RESTSerializer.extend({
  /**
   * Add locations for SAA API relationships
   */
  normalize: function(type, hash, prop) {
    hash.apiDirectory = 'ipm' + ('0' + hash.id).slice(-2);
    hash.links = {
      statuses: '/' + hash.apiDirectory + '/api/v1/statuses.json',
      nodes: '/' + hash.apiDirectory + '/api/v1/nodes.json',
      netconfig: '/' + hash.apiDirectory + '/api/v1/netconfig.json',
      networkType: '/' + hash.apiDirectory + '/api/v1/network_types.json'
    };
    return this._super(type, hash, prop);
  },

  /**
   * Relationships should use numbers, not strings
   */
  serializeBelongsTo: function(record, json, relationship) {
    var key = relationship.key;
    var belongsTo = get(record, key);
    key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo") : key;
    json[key] = Ember.isNone(belongsTo) ? belongsTo : parseInt(belongsTo.get('id'));
  },
});
