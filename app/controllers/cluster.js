import priorityToIconClass from '../utils/priority-to-icon-class';
import priorityToType from '../utils/priority-to-type';
export default Ember.ObjectController.extend({
  systemHealth: function() {
    return this.get('model.ipms.firstObject.systemHealth');
  }.property('model.ipms.@each.systemHealth'),
  systemHealthIcon: function() {
    return priorityToIconClass(this.get('systemHealth'));
  }.property('systemHealth'),
  systemHealthMessage: function() {
    return this.get('model.ipms.firstObject.systemHealthMessage');
  }.property('systemHealth'),
  systemHealthType: function() {
    return priorityToType(this.get('systemHealth'));
  }.property('systemHealth')
});
