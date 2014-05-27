export default Ember.ObjectController.extend({
  iframeSrc: function() {
    return this.get('model.firstObject.proxy') + '/';
  }.property('model.@each')
});
