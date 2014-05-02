export default Ember.ArrayController.extend({
  init: function() {
    this._super();
    this.set('clusters', this.store.all('cluster'));
    this.set('ipms', this.store.all('ipm'));
  },
  unassignedIpms: function() {
    return this.get('ipms').rejectBy('cluster');
  }.property('ipms')
});
