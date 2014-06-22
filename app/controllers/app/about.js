import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['cloud-controller'],
  coVersion: Ember.computed.alias('controllers.cloud-controller.coVersion'),
  saaVersion: Ember.computed.alias('controllers.cloud-controller.saaVersion')
});
