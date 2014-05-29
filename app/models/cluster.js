export default DS.Model.extend({
  status: DS.attr('string'),
  is_customized: DS.attr('boolean'),
  name: DS.attr('string'),
  net_provider: DS.attr('string'),
  mode: DS.attr('string'),
  net_segment_type: DS.attr('string'),
  changes: DS.attr(),
  grouping: DS.attr('string'),

  // Relationships
  release: DS.belongsTo('release', {async: true}),
  fuelNodes: DS.hasMany('fuelNode', {async: true}),
  ipms: DS.hasMany('ipm', {async: true})

});
