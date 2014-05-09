export default Ember.ArrayController.extend({
  unassignedIpms: function() {
    return this.store.all('ipm').rejectBy('cluster');
  }.property('model')
});
