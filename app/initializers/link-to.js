import Ember from 'ember';

export default {
  name: 'link-to',
  initialize: function(container, application) {
    Ember.LinkView.reopen({
      attributeBindings: ['data-toggle', 'data-hint']
    });
  }
};
