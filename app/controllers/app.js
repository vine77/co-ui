import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['ipms', 'vms'],
  ipm: function() {
    return this.get('controllers.ipms').findBy('id', '0');
  }.property('controllers.ipms.@each'),
  cluster: function() {
    return this.get('ipm.cluster');
  }.property('ipm.cluster'),
  saaVm: function() {
    return this.get('controllers.vms').findBy('isSaaAppliance');
  }.property('controllers.vms.@each'),
  isSaaApplianceRunning: function() {
    return this.get('saaVm') && this.get('saaVm.isRunning');
  }.property('saaVm.isRunning'),
  isSaaApplianceAttached: function() {
    return !!this.get('cluster');
  }.property('cluster'),
  isSaaApplianceAttachedAndRunning: function() {
    return this.get('isSaaApplianceAttached') && this.get('isSaaApplianceRunning');
  }.property('isSaaApplianceAttached','isSaaApplianceRunning')
});
