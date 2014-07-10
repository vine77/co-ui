import authenticatedRoute from '../authenticated';

export default authenticatedRoute.extend({
  model: function() {
    return this.store.all('ipm');
  },
  renderTemplate: function(controller, model) {
    return undefined;
  },
  activate: function() {
    if (this.controllerFor('app.ingredient').get('iframeSrc') === '') {
      this.controllerFor('app.ingredient').set('iframeSrc', '/ipm00/');
    }
    this.controllerFor('application').set('ingredientStyle', 'display:block;');
  },
  deactivate: function() {
    this.controllerFor('application').set('ingredientStyle', 'display:none;');
  }
});
