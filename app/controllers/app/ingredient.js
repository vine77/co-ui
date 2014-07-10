import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['application', 'app', 'ipms'],
  iframeSrc: Ember.computed.alias('controllers.application.ingredientSrc'),
  isFrameEnabled: Ember.computed.alias('controllers.app.isSaaApplianceAttachedAndRunning'),
  cluster: Ember.computed.alias('controllers.app.cluster')
});
