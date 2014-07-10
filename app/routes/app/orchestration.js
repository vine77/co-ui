import authenticatedRoute from '../authenticated';

export default authenticatedRoute.extend({
  renderTemplate: function(controller, model) {
    return undefined;
  },
  activate: function() {
    this.controllerFor('app.orchestration').set('iframeSrc', '/fuel/');
    this.controllerFor('application').set('orchestrationStyle', 'display:block;');
  },
  deactivate: function() {
    this.controllerFor('application').set('orchestrationStyle', 'display:none;');
  }
});
