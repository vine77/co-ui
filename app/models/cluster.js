export default DS.Model.extend({
  status: DS.attr('string'),
  is_customized: DS.attr('boolean'),
  release: DS.belongsTo('release'),
  name: DS.attr('string'),
  net_provider: DS.attr('string'),
  mode: DS.attr('string'),
  net_segment_type: DS.attr('string'),
  changes: DS.attr(),
  grouping: DS.attr('string'),

  // Relationships
  fuelNodes: DS.hasMany('fuelNode'),
  ipms: DS.hasMany('ipm')

});
