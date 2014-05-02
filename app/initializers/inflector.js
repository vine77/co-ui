export default {
  name: 'inflector',
  initialize: function(container, application) {
    Ember.Inflector.inflector.uncountable('netconfig');
    Ember.Inflector.inflector.uncountable('cc');
  }
};
