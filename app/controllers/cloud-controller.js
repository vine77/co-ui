import notify from '../utils/notify';
import xhrError from '../utils/xhr-error';
import health from '../utils/mappings/health';

export default Ember.ObjectController.extend({
  isActionPending: false,
  ajaxPromise: function(url, promiseOptions) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var options = promiseOptions || {};
      options.success = function(data){
        resolve(data);
      };
      options.error = function(jqXHR, status, error) {
        reject(arguments);
      };
      $.ajax(url, options);
    });
  },
  actions: {
    reboot: function() {
      var confirmed = window.confirm('Are you sure you want to reboot the cloud controller?');
      if (confirmed) {
        this.set('isActionPending', true);
        var ajaxPromise = this.get('ajaxPromise');
        ajaxPromise('/api/v1/cc', {
          dataType: 'json',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            action: 'reboot'
          })
        }).then( function(xhr) {
          this.set('isActionPending', false);
          notify('Successfully rebooted cloud controller', health.SUCCESS);
        }, function(xhr) {
          this.set('isActionPending', false);
          xhrError(xhr, 'Failed to reboot cloud controller');
        });
      }
    },
    shutdown: function() {
      var confirmed = window.confirm('Are you sure you want to shut down the cloud controller?');
      if (confirmed) {
        this.set('isActionPending', true);
        var ajaxPromise = this.get('ajaxPromise');
        ajaxPromise('/api/v1/cc', {
          dataType: 'json',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            action: 'shutdown'
          })
        }).then( function(xhr) {
          this.set('isActionPending', false);
          notify('Successfully shutdown cloud controller', health.SUCCESS);
        }, function(xhr) {
          this.set('isActionPending', false);
          xhrError(xhr, 'Failed to shutdown cloud controller');
        });
      }
    }
  }
});
