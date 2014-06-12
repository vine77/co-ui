export default Ember.ObjectController.extend({
  needs: ['app', 'ipms'],
  iframeSrc: function() {
    return '/ipm00/horizon/';
  }.property(),
  isFrameEnabled: Ember.computed.alias('controllers.app.isSaaApplianceAttached'),
  updateLocation: function() {
    var self = this;
    //Ember.run.later(this, 'updateLocation', 20000);
    return Ember.$.ajax('/ipm00/horizon/', {type: 'HEAD'}).then(function () {
      self.set('iframeSrc', '/ipm00/horizon/');
    }, function () {
      return Ember.$.ajax('/ipm00/dashboard/', {type: 'HEAD'}).then(function () {
        self.set('iframeSrc', '/ipm00/dashboard/');
      }, function () {
        self.set('iframeSrc', '/ipm00/horizon/');
        return Ember.RSVP.resolve();
      });
    });
  }
});
