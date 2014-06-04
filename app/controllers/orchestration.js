export default Ember.ObjectController.extend({
  iframeSrc: function() {
    return '//' + window.location.hostname + ':800';
  }.property('model.@each')
});
