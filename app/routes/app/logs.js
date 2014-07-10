import authenticatedRoute from '../authenticated';

export default authenticatedRoute.extend({
  model: function() {
    return this.store.all('ipm');
  },
  renderTemplate: function(controller, model) {
    return undefined;
  },
  activate: function() {
    this.controllerFor('app.logs').set('iframeSrc', '/ipm00/kibana3/index.html#/dashboard/file/logs.json');
    this.controllerFor('application').set('logsStyle', 'display:block;');
  },
  deactivate: function() {
    this.controllerFor('application').set('logsStyle', 'display:none;');
  }
});
