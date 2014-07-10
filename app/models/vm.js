import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  // id: 0 = Fuel VM, 1 = SAA IPM VM
  description: DS.attr('string'),
  state: DS.attr('number'),  // 0: no state, 1: running, 2: blocked, 3: paused, 4: shutting down, 5: shut off, 6: crashed
  stateDescription: DS.attr('string'),
  responding: DS.attr('number'),
  action: DS.attr('string'),

  // Relationships
  ipm: DS.belongsTo('ipm'),

  // Computed properties
  isRunning: Ember.computed.equal('state', 1),
  isResponding: Ember.computed.equal('responding', 1),
  isSaaAppliance: Ember.computed.gte('id', 1),
  name: Ember.computed.alias('description'),
  route: function() {
    if (this.get('id') === '0') {
      return 'app.orchestration';
    } else if (this.get('id') === '1') {
      return 'app.ingredient';
    }
  }.property('id'),
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
