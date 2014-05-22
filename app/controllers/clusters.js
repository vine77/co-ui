export default Ember.ArrayController.extend({
  itemController: 'cluster',
  hasNoClusters: function() {
    return this.get('model.length') < 1;
  }.property('model.@each'),
  hasMultipleClusters: function() {
    return this.get('model.length') > 1;
  }.property('model.@each'),
  unassignedIpms: function() {
    return this.store.all('ipm').rejectBy('cluster');
  }.property('model')
});
