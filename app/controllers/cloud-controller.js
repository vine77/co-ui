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
  actions: {
    reboot: function() {
      var ajaxPromise = this.get('ajaxPromise');
      var reboot = ajaxPromise('/api/v1/cc', {
        dataType: 'json',
        type: "POST",
        contentType: "application/json",
        data: '{"co_version": null, "saa_version": null, "action": "reboot"}',
      }).then( function(xhr) {
        Event('Successfully rebooted cloud controller', Health.SUCCESS);
      }, function(xhr) {
        XhrError(xhr, 'Failed to reboot cloud controller');
      });
    }, 
    shutdown: function() {
      var ajaxPromise = this.get('ajaxPromise');
      var reboot = ajaxPromise('/api/v1/cc', {
        dataType: 'json',
        type: "POST",
        contentType: "application/json",
        data: '{"co_version": null, "saa_version": null, "action": "shutdown"}',
      }).then( function(xhr) {
         Event('Successfully shutdown cloud controller', Health.SUCCESS);
      }, function(xhr) {
        XhrError(xhr, 'Failed to shutdown cloud controller');
      });
    }
  }
});
