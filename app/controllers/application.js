export default Ember.ObjectController.extend({
  needs: ['app/control-panel', 'login'],
  isLoggedIn: Ember.computed.alias('controllers.login.isLoggedIn'),
  username: Ember.computed.alias('controllers.login.username'),
  isInfrastructure: function() {
    return this.get('currentRouteName') === 'app.control-panel' && this.get('controllers.app/control-panel.viewName') === 'infrastructure';
  }.property('currentRouteName', 'controllers.app/control-panel.viewName'),
  isClouds: function() {
    return this.get('currentRouteName') === 'app.control-panel' && this.get('controllers.app/control-panel.viewName') === 'clouds';
  }.property('currentRouteName', 'controllers.app/control-panel.viewName')
});
