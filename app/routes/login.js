export default Ember.Route.extend({
  beforeModel: function() {
    var isLoggedIn = this.controllerFor('login').get('isLoggedIn');
    if (isLoggedIn) this.transitionTo('app.dashboard');
  },
  model: function() {
    return this.store.find('session', 'current_session');
  }
});
