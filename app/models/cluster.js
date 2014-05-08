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
  fuelNodes: DS.hasMany('fuelNode', {async: true}),
  ipms: DS.hasMany('ipm', {async: true}),

  // Computed properties
  details: function() {
    return 'Nodes: ' + this.get('fuelNodes.length') + '<br>CPU (cores): 504<br>HDD: 7.6 TB<br>RAM: 644.1 GB';
  }.property('fuelNodes')

});
