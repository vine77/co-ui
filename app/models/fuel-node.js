export default DS.Model.extend({
  status: DS.attr('string'),
  name: DS.attr('string'),
  roles: DS.attr(),
  ip: DS.attr('string'),
  error_type: DS.attr('string'),
  pending_addition: DS.attr('boolean'),
  fqdn: DS.attr('string'),
  network_data: DS.attr(),
  platform_name: DS.attr('string'),
  mac: DS.attr('string'),
  meta: DS.attr(),
  pending_deletion: DS.attr('boolean'),
  online: DS.attr('boolean'),
  progress: DS.attr('number'),
  pending_roles: DS.attr(),
  os_platform: DS.attr('string'),
  manufacturer: DS.attr('string'),

  // Relationships
  cluster: DS.belongsTo('cluster')

});
