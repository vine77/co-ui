import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('number'),
  proxy: DS.attr('string'),

  // Relationships
  cluster: DS.belongsTo('cluster', {async: true}),
  vm: DS.belongsTo('vm', {async: true}),

  // Relationships to SAA APIs
  statuses: DS.hasMany('status', {async: true, persist: false}),
  nodes: DS.hasMany('node', {async: true, persist: false}),
  netconfig: DS.belongsTo('netconfig', {async: true, persist: false}),
  networkType: DS.belongsTo('networkType', {async: true, persist: false}),

  // Computed properties
  route: function() {
    return 'app.ingredient';
  }.property(),
  statusMessage: function() {
    switch (this.get('status')) {
      case 0:
        return 'unassigned';
      case 1:
        return 'rebuilding';
      case 2:
        return 'configuring';
      case 3:
        return 'operational';
      case -1:
        return 'unknown';
      default:
        return 'unknown';
    }
  }.property('status'),
  systemStatus: function() {
    return this.get('statuses').findBy('id', 'system');
  }.property('statuses.@each'),
  systemHealth: function() {
    return this.get('systemStatus') && this.get('systemStatus').get('health');
  }.property('statuses.@each'),
  systemHealthMessage: function() {
    return this.get('systemStatus') && this.get('systemStatus').get('message');
  }.property('statuses.@each'),
  topStatuses: function() {
    return this.get('systemStatus') && this.get('systemStatus').get('offspring');
  }.property('statuses.@each')

});
