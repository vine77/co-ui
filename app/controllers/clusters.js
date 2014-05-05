export default Ember.ArrayController.extend({
  init: function() {
    this._super();
    this.set('model', this.store.all('cluster'));
  },
  unassignedIpms: function() {
    return this.store.all('ipm').rejectBy('cluster');
  }.property('model')
});
