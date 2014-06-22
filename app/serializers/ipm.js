import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  /**
   * Add locations for SAA API relationships
   */
  normalize: function(type, hash, prop) {
    if (hash.id === 0) { hash.vm_id = 1; }
    if (hash.proxy) {
      hash.links = {
        statuses: hash.proxy + '/api/v1/statuses.json',
        nodes: hash.proxy + '/api/v1/nodes.json',
        netconfig: hash.proxy + '/api/v1/netconfig.json',
        networkType: hash.proxy + '/api/v1/network_types.json'
      };
    }
    return this._super(type, hash, prop);
  },

  /**
   * IDs should be numbers, not strings
   */
  serialize: function(record, options) {
    var json = this._super(record, options);
    if (options && options.includeId && record.get('id')) {
      json[this.get('primaryKey')] = parseInt(record.get('id'));
    }
    return json;
  },

  /**
   * belongsTo relationship should use numbers, not strings. Add support for persist flag to belongsTo relationship.
   */
  serializeBelongsTo: function(record, json, relationship) {
    if (relationship.options.persist !== false) {
      var key = relationship.key;
      var belongsTo = Ember.get(record, key);
      key = this.keyForRelationship ? this.keyForRelationship(key, 'belongsTo') : key;
      json[key] = Ember.isNone(belongsTo) ? belongsTo : parseInt(belongsTo.get('id'));
    }
  },

  /**
   * Add support for persist flag to hasMany relationship
   */
  serializeHasMany: function(record, json, relationship) {
    if (relationship.options.persist !== false) {
      return this._super(record, json, relationship);
    }
  },

  /**
   * Add support for persist flag to attributes
   */
  serializeAttribute: function(record, json, key, attribute) {
    if (attribute.options.persist !== false) {
      return this._super(record, json, key, attribute);
    }
  }

});
