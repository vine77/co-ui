export default DS.Model.extend({
  description: DS.attr('string'),
  state: DS.attr('number'),
  stateDescription: DS.attr('string'),
  action: DS.attr('string')
});
