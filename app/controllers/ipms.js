import notify from '../utils/notify';
import xhrError from '../utils/xhr-error';
import health from '../utils/mappings/health';

export default Ember.ArrayController.extend({
  needs: ['clusters'],
  itemController: 'ipm',
  hasMultipleClusters: function() {
    return this.get('controllers.clusters.length') > 1;
  }.property('controllers.clusters'),
  actions: {
    detach: function(ipm) {
      var cluster = ipm.get('cluster');
      var confirmed = window.confirm('Are you sure you want to detach "' + ipm.get('name') + '" from cluster "' + cluster.get('name') + '?"');
      if (confirmed) {
        ipm.set('cluster', null);
        ipm.save().then(function() {
          notify('"' + ipm.get('name') + '" was successfully detached from cluster "' + cluster.get('name') + '."', health.SUCCESS);
          cluster.get('ipms').removeObject(ipm);  // Set other side of relationship until single-source-of-truth branch is merged
        }, function(xhr) {
          xhrError(xhr);
          ipm.rollback();
        });
      }
    },
    attach: function(ipm, cluster) {
      if (!cluster) cluster = this.store.all('cluster').objectAt(0);
      var confirmed = window.confirm('Are you sure you want to attach "' + ipm.get('name') + '" to cluster "' + cluster.get('name') + '?"');
      if (confirmed) {
        ipm.set('cluster', cluster);
        ipm.save().then(function() {
          notify('"' + ipm.get('name') + '" was successfully attached to cluster "' + cluster.get('name') + '."', health.SUCCESS);
          cluster.get('ipms').addObject(ipm);  // Set other side of relationship until single-source-of-truth branch is merged
        }, function(xhr) {
          xhrError(xhr);
          ipm.rollback();
        });
      }
    }
  }
});
