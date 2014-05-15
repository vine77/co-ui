export default Ember.ObjectController.extend({
  needs: ['clusters'],
  isActionDisabled: function() {
    return this.get('controllers.clusters.hasNoClusters') || this.get('status') === 1 || this.get('status') === 2;
  }.property('status')
});
