import authenticatedRoute from '../authenticated';

export default authenticatedRoute.extend({
  model: function() {
    return this.store.find('user', this.controllerFor('login').get('username'));
  }
});
