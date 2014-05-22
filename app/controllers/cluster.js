export default Ember.ObjectController.extend({
  systemHealth: function() {
    return this.get('model.ipms.firstObject.systemHealth');
  }.property('model.ipms.@each.systemHealth')
});
