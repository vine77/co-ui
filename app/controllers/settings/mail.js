export default Ember.ObjectController.extend({
  needs: ['login'],
  username: Ember.computed.alias('controllers.login.username')
});
