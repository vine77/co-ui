export default Ember.ObjectController.extend({
  needs: ['index'],
  isInfrastructure: function() {
    return this.get('currentRouteName') === 'index' && this.get('controllers.index.viewClass') === 'infrastructure-view';
  }.property('currentRouteName', 'controllers.index.viewClass'),
  isClouds: function() {
    return this.get('currentRouteName') === 'index' && this.get('controllers.index.viewClass') === 'clouds-view';
  }.property('currentRouteName', 'controllers.index.viewClass')
});
