export default DS.Model.extend({
  name: DS.attr('string'),
  status: DS.attr('number'),
  apiDirectory: DS.attr('string'),

  // Relationships
  cluster: DS.belongsTo('cluster', {async: true}),

  // Relationships to SAA APIs
  statuses: DS.hasMany('status', {async: true}),
  nodes: DS.hasMany('node', {async: true}),
  netconfig: DS.belongsTo('netconfig', {async: true}),
  networkType: DS.belongsTo('networkType', {async: true}),

  // Computed properties
  isActionDisabled: function() {
    return this.get('status') === 1 || this.get('status') === 2;
  }.property('status'),
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
