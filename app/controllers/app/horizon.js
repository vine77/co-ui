export default Ember.ObjectController.extend({
  needs: ['ipms'],
  iframeSrc: function() {
    //return this.get('model.firstObject.proxy') + '/horizon/';
    return '/ipm00/horizon/';
  }.property(),
  isSaaApplianceAttached: function() {
    return (this.get('controllers.ipms') && this.get('controllers.ipms').findBy('id', '0') && !!this.get('controllers.ipms').findBy('id', '0').get('cluster'));
  }.property('controllers.ipms.@each'),
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
