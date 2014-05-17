export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('number'),
  apiDirectory: DS.attr('string', {persist: false}),

  // Relationships
  cluster: DS.belongsTo('cluster', {async: true}),

  // Relationships to SAA APIs
  statuses: DS.hasMany('status', {async: true, persist: false}),
  nodes: DS.hasMany('node', {async: true, persist: false}),
  netconfig: DS.belongsTo('netconfig', {async: true, persist: false}),
  networkType: DS.belongsTo('networkType', {async: true, persist: false}),

  // Computed properties
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
  systemStatus: function() {
    return this.get('statuses').findBy('id', 'system') && this.get('statuses').findBy('id', 'system').get('message');
  }.property('statuses.@each')

});
