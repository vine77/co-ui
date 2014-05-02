export default DS.Model.extend({
  status: DS.attr('string'),
  name: DS.attr('string'),
  result: DS.attr(),
  progress: DS.attr('number'),
  message: DS.attr('string'),
  uuid: DS.attr('string'),

  // Relationships
  cluster: DS.belongsTo('cluster')

});
