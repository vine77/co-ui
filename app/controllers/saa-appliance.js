export default Ember.ObjectController.extend({
  iframeSrc: function() {
    //return '/';
    return '/' + this.get('model.firstObject.apiDirectory');
  }.property('model.@each')
});
