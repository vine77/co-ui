import authenticatedRoute from '../authenticated';

export default authenticatedRoute.extend({
  /*
  model: function() {
    return this.controllerFor('app.horizon').updateLocation();
  },
  */
  renderTemplate: function(controller, model) {
    return undefined;
  },
  activate: function() {
    //this.controllerFor('app.horizon').set('iframeSrc', 'http://' + window.location.hostname + ':' + this.controllerFor('ipms').findBy('name', 'SAAappliance').get('horizon_port'));
    this.controllerFor('application').set('horizonStyle', 'display:block;');
  },
  deactivate: function() {
    this.controllerFor('application').set('horizonStyle', 'display:none;');
  }
});
