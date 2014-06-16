export default Ember.ObjectController.extend({
  needs: ['app', 'ipms'],
  iframeSrc: function() {
    return '/ipm00/';
  }.property(),
  isFrameEnabled: Ember.computed.alias('controllers.app.isSaaApplianceAttachedAndRunning'),
  cluster: Ember.computed.alias('controllers.app.cluster')
});
