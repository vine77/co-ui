export default DS.ActiveModelAdapter.extend({
  namespace: 'api/v1',
  buildURL: function(type, id) {
    return this._super(type, id) + '.json';
  },

  /**
   * JSONAPI: Cast individual record to array,
   * and match the root key to the route
   */
  createRecord: function(store, type, record) {
    var data = {};
    data[this.pathForType(type.typeKey)] = [
      store.serializerFor(type.typeKey).serialize(record, {includeId: true})
    ];

    return this.ajax(this.buildURL(type.typeKey), "POST", {data: data});
  },

  /**
   * JSONAPI: Cast individual record to array,
   * and match the root key to the route
   */
  updateRecord: function(store, type, record) {
    var data = {};
    data[this.pathForType(type.typeKey)] = [
      store.serializerFor(type.typeKey).serialize(record)
    ];

    var id = Ember.get(record, 'id');

    return this.ajax(this.buildURL(type.typeKey, id), "PUT", {data: data});
  }
});
