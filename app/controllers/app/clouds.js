import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['clusters', 'ipms']
});
