export default DS.RESTAdapter.extend({
  namespace: 'fuel/api',
  pathForType: function(type) {
    return 'nodes';
  }
});
