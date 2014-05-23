export default DS.ActiveModelAdapter.extend({
  namespace: 'api/v1',
  buildURL: function(type, id) {
    return this._super(type, id) + '.json';
  },

  /**
   * POST to /sessions instead of PUT to /sessions/:id for updating record
   */
  updateRecord: function(store, type, record) {
    var data = {};
    var serializer = store.serializerFor(type.typeKey);
    serializer.serializeIntoHash(data, type, record);
    return this.ajax(this.buildURL(type.typeKey), 'POST', {data: data});
  }

});
