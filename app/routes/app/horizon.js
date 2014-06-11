import authenticatedRoute from '../authenticated';

export default authenticatedRoute.extend({
  model: function() {
    return this.controllerFor('app.horizon').updateLocation();
  }
});
