export default Ember.ObjectController.extend({
  iframeSrc: function() {
    //return this.get('model.firstObject.proxy') + '/kibana3/index.html#/dashboard/file/logs.json';
    return '/ipm00/kibana3/index.html#/dashboard/file/logs.json';
  }.property('model.@each')
});
