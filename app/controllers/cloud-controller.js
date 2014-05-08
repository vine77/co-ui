export default Ember.ObjectController.extend({
  init: function() {
    this._super();
    this.set('model', this.store.getById('cloudController', 'current'));
  }
});
