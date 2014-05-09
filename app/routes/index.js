export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('cloudController').set('model', this.store.getById('cloudController', 'current'));
    this.controllerFor('vms').set('model', this.store.all('vm'));
    this.controllerFor('clusters').set('model', this.store.all('cluster'));
  }
});
