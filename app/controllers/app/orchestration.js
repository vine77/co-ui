import Ember from 'ember';

export default Ember.ObjectController.extend({
  iframeSrc: function() {
    return '/fuel/';
  }.property('model.@each')
});
