export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('number'),
  proxy: DS.attr('string'),

  // Relationships
  cluster: DS.belongsTo('cluster', {async: true}),
  vm: DS.belongsTo('vm'),

  // Relationships to SAA APIs
  statuses: DS.hasMany('status', {async: true, persist: false}),
  nodes: DS.hasMany('node', {async: true, persist: false}),
  netconfig: DS.belongsTo('netconfig', {async: true, persist: false}),
  networkType: DS.belongsTo('networkType', {async: true, persist: false}),

  // Computed properties
  route: function() {
    return 'saa-appliance';
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
    }
  }.property('status'),
  systemHealth: function() {
    return this.get('statuses').findBy('id', 'system') && this.get('statuses').findBy('id', 'system').get('health');
  }.property('statuses.@each.health'),
  systemHealthMessage: function() {
    var message = this.get('statuses').findBy('id', 'system') && this.get('statuses').findBy('id', 'system').get('message');
    return message || 'Unknown';
  }.property('statuses.@each.message')

});
