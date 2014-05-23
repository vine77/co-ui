export default Ember.ObjectController.extend({
  iframeSrc: function() {
    return '/ipm00/kibana3/';
  }.property('model.@each')
});
