export default Ember.ObjectController.extend({
  needs: ['index'],
  isInfrastructure: function() {
    return this.get('currentRouteName') === 'index' && this.get('controllers.index.viewName') === 'infrastructure';
  }.property('currentRouteName', 'controllers.index.viewName'),
  isClouds: function() {
    return this.get('currentRouteName') === 'index' && this.get('controllers.index.viewName') === 'clouds';
  }.property('currentRouteName', 'controllers.index.viewName')
});
