export default Ember.Handlebars.makeBoundHelper(function(text) {
  return text.toString().capitalize();
});
