export default {
  name: 'extentions',
  initialize: function(container, application) {
    Ember.RSVP.Promise.prototype.always = function(func) {
      return this.then(func, func);
    };
  }
};
