export default Ember.ObjectController.extend({
  iframeSrc: function() {
    //return '/fuel/';
    return 'http://' + window.location.hostname + ':800';
  }.property('model.@each')
});
