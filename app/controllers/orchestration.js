export default Ember.ObjectController.extend({
  iframeSrc: function() {
    //return '/';
    return '/fuel';
  }.property('model.@each')
});
