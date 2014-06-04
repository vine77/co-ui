export default Ember.ObjectController.extend({
  iframeSrc: function() {
    //return this.get('model.firstObject.proxy') + '/';
    return '/ipm00/';
  }.property('model.@each')
});
