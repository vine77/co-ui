import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(text) {
  return text && text.toString().capitalize();
});
