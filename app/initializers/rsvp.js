import Ember from 'ember';

export default {
  name: 'rsvp',
  initialize: function(container, application) {
    Ember.RSVP.Promise.prototype.always = function(func) {
      return this.then(func, func);
    };
  }
};
