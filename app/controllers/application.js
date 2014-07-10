import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['app', 'app/control-panel', 'login'],
  isDevelopment: CoUiENV.environment === 'development',
  isLoggedIn: Ember.computed.alias('controllers.login.isLoggedIn'),
  username: Ember.computed.alias('controllers.login.username'),
  isFrameEnabled: Ember.computed.alias('controllers.app.isSaaApplianceAttachedAndRunning'),
  isInfrastructure: function() {
    return this.get('currentRouteName') === 'app.control-panel' && this.get('controllers.app/control-panel.viewName') === 'infrastructure';
  }.property('currentRouteName', 'controllers.app/control-panel.viewName'),
  isClouds: function() {
    return this.get('currentRouteName') === 'app.control-panel' && this.get('controllers.app/control-panel.viewName') === 'clouds';
  }.property('currentRouteName', 'controllers.app/control-panel.viewName'),
  orchestrationStyle: 'display:none;',
  ingredientStyle: 'display:none',
  horizonStyle: 'display:none',
  logsStyle: 'display:none',
  orchestrationSrc: '',
  ingredientSrc: '',
  horizonSrc: '',
  logsSrc: ''
});
