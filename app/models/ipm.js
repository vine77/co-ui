export default DS.Model.extend({
  name: DS.attr('string'),

  // Relationships
  cluster: DS.belongsTo('cluster'),

  // Relationships to SAA APIs
  statuses: DS.hasMany('status', {async: true}),
  nodes: DS.hasMany('node', {async: true}),
  netconfig: DS.belongsTo('netconfig', {async: true}),
  networkType: DS.belongsTo('networkType', {async: true})
});
