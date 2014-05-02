export default DS.Model.extend({
  capabilities: DS.attr(),
  cloudServices: DS.attr(),
  contention: DS.attr(),
  ids: DS.attr(),
  name: DS.attr('string'),
  schedulerMark: DS.attr('number'),
  schedulerPersistent: DS.attr('boolean'),
  status: DS.attr(),
  tier: DS.attr('string'),
  utilization: DS.attr(),
  vmInfo: DS.attr(),
  memory: Ember.computed.alias('utilization.cloud.memory'),
  vcpus: Ember.computed.alias('utilization.cloud.vcpus'),

  // Relationships
  ipm: DS.belongsTo('ipm')

});
