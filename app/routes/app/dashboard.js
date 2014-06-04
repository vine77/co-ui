import authenticatedRoute from '../authenticated';

export default authenticatedRoute.extend({
  beforeModel: function() {
    this.transitionTo('app.control-panel');
  }
});
