export default Ember.ObjectController.extend({
  needs: ['app'],
  iframeSrc: function() {
    return '/ipm00/kibana3/index.html#/dashboard/file/logs.json';
  }.property(),
  isFrameEnabled: Ember.computed.alias('controllers.app.isSaaApplianceAttached')
});
