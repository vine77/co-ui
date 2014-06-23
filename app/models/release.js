import DS from 'ember-data';

export default DS.Model.extend({
  operating_system: DS.attr('string'),
  description: DS.attr('string'),
  roles: DS.attr(),
  state: DS.attr('string'),
  version: DS.attr('string'),
  roles_metadata: DS.attr(),
  modes_metadata: DS.attr(),
  name: DS.attr('string')
});
