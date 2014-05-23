export default Ember.Route.extend({
  model: function() {
    return this.store.find('session', 'current_session');
  }
});
