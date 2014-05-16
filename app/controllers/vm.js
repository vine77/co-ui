import Event from "../helpers/event";
import XhrError from "../helpers/xhr-error";
import Health from '../utils/mappings/health';
export default Ember.ObjectController.extend({
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
  actions: {
    reboot: function() {
      var ajaxPromise = this.get('ajaxPromise');
      var reboot = ajaxPromise('/api/v1/vms', {
        dataType: 'json',
        type: "POST",
        contentType: "application/json",
        data: '{"id": '+this.get('id')+', "description": null, "state": null, "state_description": null, "action": "reboot"}',
      }).then( function(xhr) {
        Event('Successfully rebooted VM', Health.SUCCESS);
      }, function(xhr) {
        XhrError(xhr, 'Failed to reboot VM');
      });
    },
    start: function() {
      var ajaxPromise = this.get('ajaxPromise');
      var reboot = ajaxPromise('/api/v1/vms', {
        dataType: 'json',
        type: "POST",
        contentType: "application/json",
        data: '{"id": '+this.get('id')+', "description": null, "state": null, "state_description": null, "action": "create"}',
      }).then( function(xhr) {
        Event('Successfully started VM', Health.SUCCESS);
      }, function(xhr) {
        XhrError(xhr, 'Failed to started VM');
      });
    },
    shutdown: function() {
      var ajaxPromise = this.get('ajaxPromise');
      var reboot = ajaxPromise('/api/v1/vms', {
        dataType: 'json',
        type: "POST",
        contentType: "application/json",
        data: '{"id": '+this.get('id')+', "description": null, "state": null, "state_description": null, "action": "shutdown"}',
      }).then( function(xhr) {
        Event('Successfully shutdown VM', Health.SUCCESS);
      }, function(xhr) {
        XhrError(xhr, 'Failed to shutdown VM');
      });
    },
    forcedShutdown: function() {
      var ajaxPromise = this.get('ajaxPromise');
      var reboot = ajaxPromise('/api/v1/vms', {
        dataType: 'json',
        type: "POST",
        contentType: "application/json",
        data: '{"id": '+this.get('id')+', "description": null, "state": null, "state_description": null, "action": "destroy"}',
      }).then( function(xhr) {
        Event('Successfully force shutdown VM', Health.SUCCESS);
      }, function(xhr) {
        XhrError(xhr, 'Failed to force shutdown VM');
      });
    }
  }
});
