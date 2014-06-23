import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'fuel/api',
  buildURL: function(type, id) {
    // Singleton: remove ID from URI
    return this._super(type);
  },
  pathForType: function(type) {
    return 'version';
  }
});
