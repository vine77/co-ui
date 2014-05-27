import priorityToIconClass from '../utils/priority-to-icon-class';
import priorityToType from '../utils/priority-to-type';

export default Ember.ObjectController.extend({
  needs: ['ipms'],
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
      return this.get('controllers.ipms').send('attach', ipm, cluster);
    }
  }
});
