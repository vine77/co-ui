import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['application'],
  iframeSrc: Ember.computed.alias('controllers.application.orchestrationSrc')
});
