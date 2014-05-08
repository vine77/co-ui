export default Ember.ArrayController.extend({
  init: function() {
    this._super();
    this.set('model', this.store.all('vm'));
  }
});
