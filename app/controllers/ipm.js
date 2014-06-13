export default Ember.ObjectController.extend({
  needs: ['clusters'],
  isActionPending: false,
  isActionDisabled: function() {
    return this.get('controllers.clusters.hasNoClusters');
  }.property('status')
});
