import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  namespace: 'api/v1',
  buildURL: function(type, id) {
    // Singleton: remove ID from URI
    return this._super(type) + '.json';
  }
});
