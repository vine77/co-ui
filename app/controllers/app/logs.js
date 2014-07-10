import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['application', 'app'],
  iframeSrc: Ember.computed.alias('controllers.application.logsSrc'),
  isFrameEnabled: Ember.computed.alias('controllers.app.isSaaApplianceAttachedAndRunning')
});
