export default Ember.Route.extend({
  beforeModel: function() {
    // Set up development variables
    window.store = this.store;
    window.route = this;
  }
});
