export default Ember.ObjectController.extend({
  needs: ['ipms'],
  iframeSrc: function() {
    //return this.get('model.firstObject.proxy') + '/';
    return '/ipm00/';
  }.property(),
  isSaaApplianceAttached: function() {
    return (this.get('controllers.ipms') && this.get('controllers.ipms').findBy('id', '0') && !!this.get('controllers.ipms').findBy('id', '0').get('cluster'));
  }.property('controllers.ipms'),

});
