import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['cloud-controller', 'vms']
});
