export default Ember.ObjectController.extend({
  version: function() {
    var id = parseInt(this.get('id'));
    if (id === 0) {
      return this.store.getById('version', 'current').get('release');
    } else if (id === 1) {
      return this.store.getById('cloudController', 'current').get('saaVersion');
    }
  }.property('id')
});
