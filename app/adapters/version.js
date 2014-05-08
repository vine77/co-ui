export default DS.RESTAdapter.extend({
  namespace: 'fuel/api',
  buildURL: function(type, id) {
    // Singleton: remove ID from URI
    return this._super(type) + '.json';
  },
  pathForType: function(type) {
    return 'version';
  }
});