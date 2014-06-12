import notify from '../utils/notify';
import xhrError from '../utils/xhr-error';
import health from '../utils/mappings/health';
import vmAction from '../controllers/vm-action';

export default Ember.ObjectController.extend({
  isActionPending: false,
  ajaxPromise: function(url, promiseOptions) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var options = promiseOptions || {};
      options.success = function(data){
        resolve(data);
      };
      options.error = function(jqXHR, status, error){
        reject(arguments);
      };
      $.ajax(url, options);
    });
  },
  version: function() {
    var id = parseInt(this.get('id'));
    if (id === 0) {
      return this.store.getById('version', 'current').get('release');
    } else if (id === 1) {
      return this.store.getById('cloudController', 'current').get('saaVersion');
    }
  }.property('id'),
  vmActions: function() {
    return [
      vmAction.create({
        name: 'Start',
        method: 'start',
        sortOrder: 0,
        vm: this
      }),
      vmAction.create({
        name: 'Reboot',
        method: 'reboot',
        sortOrder: 1,
        vm: this
      }),
      vmAction.create({
        name: 'Graceful Shutdown',
        method: 'shutdown',
        sortOrder: 2,
        vm: this
      }),
      vmAction.create({
        name: 'Force Shutdown',
        method: 'forcedShutdown',
        sortOrder: 3,
        vm: this
      })
    ];
  }.property('state', 'model.state'),
  firstAction: function() {
    return this.get('vmActions').findBy('isFirstAction', true);
  }.property('vmActions.@each'),
  actionsAreAvailable: function() {
    return this.get('vmActions').filterBy('isVisible').get('length') > 1;
  }.property('vmActions'),
  actions: {
    reboot: function() {
      var confirmed = window.confirm('Are you sure you want to reboot "' + this.get('name') + '"?');
      if (confirmed) {
        this.set('isActionPending', true);
        var ajaxPromise = this.get('ajaxPromise');
        ajaxPromise('/api/v1/vms', {
          dataType: 'json',
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            vms: [{
              id: this.get('id'),
              action: 'reboot'
            }]
          })
        }).then( function(xhr) {
          this.set('isActionPending', false);
          notify('Successfully rebooted VM', health.SUCCESS);
        }, function(xhr) {
          this.set('isActionPending', false);
          xhrError(xhr, 'Failed to reboot VM');
        });
      }
    },
    start: function() {
      var confirmed = window.confirm('Are you sure you want to start "' + this.get('name') + '"?');
      if (confirmed) {
        this.set('isActionPending', true);
        var ajaxPromise = this.get('ajaxPromise');
        ajaxPromise('/api/v1/vms', {
          dataType: 'json',
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            vms: [{
              id: this.get('id'),
              action: 'create'
            }]
          })
        }).then( function(xhr) {
          this.set('isActionPending', false);
          notify('Successfully started VM', health.SUCCESS);
        }, function(xhr) {
          this.set('isActionPending', false);
          xhrError(xhr, 'Failed to started VM');
        });
      }
    },
    shutdown: function() {
      var confirmed = window.confirm('Are you sure you want to shut down "' + this.get('name') + '"?');
      if (confirmed) {
        this.set('isActionPending', true);
        var ajaxPromise = this.get('ajaxPromise');
        ajaxPromise('/api/v1/vms', {
          dataType: 'json',
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            vms: [{
              id: this.get('id'),
              action: 'shutdown'
            }]
          })
        }).then( function(xhr) {
          this.set('isActionPending', false);
          notify('Successfully shutdown VM', health.SUCCESS);
        }, function(xhr) {
          this.set('isActionPending', false);
          xhrError(xhr, 'Failed to shutdown VM');
        });
      }
    },
    forcedShutdown: function() {
      var confirmed = window.confirm('Are you sure you want to force shut down "' + this.get('name') + '"?');
      if (confirmed) {
        this.set('isActionPending', true);
        var ajaxPromise = this.get('ajaxPromise');
        ajaxPromise('/api/v1/vms', {
          dataType: 'json',
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({
            vms: [{
              id: this.get('id'),
              action: 'destroy'
            }]
          })
        }).then( function(xhr) {
          this.set('isActionPending', false);
          notify('Successfully force shutdown VM', health.SUCCESS);
        }, function(xhr) {
          this.set('isActionPending', false);
          xhrError(xhr, 'Failed to force shutdown VM');
        });
      }
    },
    performAction: function(method) {
      this.send(method);
    }
  }
});
