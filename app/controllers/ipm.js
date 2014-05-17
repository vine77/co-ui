export default Ember.ObjectController.extend({
  needs: ['clusters'],
  isActionDisabled: function() {
    return this.get('controllers.clusters.hasNoClusters');
  }.property('status')
});
