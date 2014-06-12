export default Ember.ObjectController.extend({
  needs: ['ipms'],
  ipm: function() {
    return this.get('controllers.ipms') && this.get('controllers.ipms').findBy('id', '0');
  }.property('controllers.ipms'),
  cluster: function() {
    return this.get('ipm.cluster');
  }.property('ipm.cluster'),
  isSaaApplianceAttached: function() {
    return !!this.get('cluster');
  }.property('cluster')
});