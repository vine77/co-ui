export default Ember.Route.extend({
  beforeModel: function(params, transition, queryParams) {
    var isLoggedIn = this.controllerFor('login').get('isLoggedIn');
    if (!isLoggedIn) {
      if (transition) {
        this.controllerFor('login').set('attemptedTransition', transition);
      }
      return this.transitionTo('login');
    }
  }
});
