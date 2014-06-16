export default Ember.ObjectController.extend({
  needs: ['ipms', 'vms'],
  saaVm: function() {
    return !!this.get('controllers.vms') && this.get('controllers.vms').findBy('isSaaAppliance');
  }.property('controllers.vms', 'controllers.ipms'),
  isSaaApplianceRunning: function() {
    return !!this.get('saaVm') && this.get('saaVm.isRunning');
  }.property('saaVm.isRunning'),
  ipm: function() {
    return this.get('controllers.ipms') && this.get('controllers.ipms').findBy('id', '0');
  }.property('controllers.ipms'),
  cluster: function() {
    return this.get('ipm.cluster');
  }.property('ipm.cluster'),
  isSaaApplianceAttached: function() {
    return !!this.get('cluster');
  }.property('cluster'),
  isSaaApplianceAttachedAndRunning: function() {
    return !!this.get('isSaaApplianceAttached') && !!this.get('isSaaApplianceRunning');
  }.property('isSaaApplianceAttached','isSaaApplianceRunning')
});
