import priorityToIconClass from '../utils/priority-to-icon-class';
import priorityToType from '../utils/priority-to-type';
import bytesToReadableSize from '../utils/bytes-to-readable-size';

export default Ember.ObjectController.extend({
  needs: ['ipms'],

  // Computed properties
  numberOfCores: function() {
    return this.get('fuelNodes').reduce(function(previousValue, item, index, enumerable) {
      return previousValue + item.get('meta.cpu.total');
    }, 0);
  }.property('fuelNodes.@each'),
  totalStorage: function() {
    return this.get('fuelNodes').reduce(function(previousValue, item, index, enumerable) {
      return previousValue + item.get('meta.disks').reduce(function(previousValue, item, index, enumerable) {
        return previousValue + item.size;
      }, 0);
    }, 0);
  }.property('fuelNodes.@each'),
  totalMemory: function() {
    return this.get('fuelNodes').reduce(function(previousValue, item, index, enumerable) {
      return previousValue + item.get('meta.memory.total');
    }, 0);
  }.property('fuelNodes.@each'),
  details: function() {
    return [
      'Nodes: ' + this.get('fuelNodes.length'),
      'CPU (cores): ' + this.get('numberOfCores'),
      'HDD: ' + bytesToReadableSize(this.get('totalStorage')),
      'RAM: ' + bytesToReadableSize(this.get('totalMemory'))
    ].join('<br>');
  }.property('fuelNodes.@each'),
  systemHealth: function() {
    return this.get('model.ipms.firstObject.systemHealth');
  }.property('model.ipms.@each.systemHealth'),
  systemHealthIcon: function() {
    return priorityToIconClass(this.get('systemHealth'));
  }.property('systemHealth'),
  systemHealthMessage: function() {
    var message = this.get('model.ipms.firstObject.systemHealthMessage');
    return message || 'Unknown';
  }.property('systemHealth'),
  systemHealthType: function() {
    return priorityToType(this.get('systemHealth'));
  }.property('systemHealth'),
  actions: {
    attach: function(ipm, cluster) {
      // Forward action to IPMs controller
      return this.get('controllers.ipms').send('attach', ipm, cluster);
    }
  }
});
