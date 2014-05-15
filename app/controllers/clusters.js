export default Ember.ArrayController.extend({
  hasNoClusters: function() {
    return this.get('model.length') === 0;
  }.property('model.@each'),
  hasMultipleClusters: function() {
    return this.get('model.length') > 1;
  }.property('model.@each'),
  unassignedIpms: function() {
    return this.store.all('ipm').rejectBy('cluster');
  }.property('model')
});
