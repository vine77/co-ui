export default DS.Model.extend({
  description: DS.attr('string'),
  state: DS.attr('number'),
  stateDescription: DS.attr('string'),
  responding: DS.attr('number'),
  action: DS.attr('string'),

  // Computed properties
  //isResponding: Ember.computed.eq(1),
  name: Ember.computed.alias('description'),
  respondingMessage: function() {
    if (this.get('responding') === 1) {
      return 'responding';
    } else if (this.get('responding') === 2) {
      return 'not responding';
    } else {
      return 'unknown';
    }
  }.property('responding')

});
