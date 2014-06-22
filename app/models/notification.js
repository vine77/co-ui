import DS from 'ember-data';

export default DS.Model.extend({
  status: DS.attr('string'),
  topic: DS.attr('string'),
  time: DS.attr('string'),
  date: DS.attr('string'),
  message: DS.attr('string'),

  // Relationships
  cluster: DS.belongsTo('cluster'),
  node: DS.belongsTo('fuelNode'),
  task: DS.belongsTo('task')

});
