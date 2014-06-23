import Ember from 'ember';
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
      Ember.$.ajax(url, options);
    });
  },
  actions: {
    reboot: function() {
      var self = this;
      var confirmation = [
        'Are you sure you want to reboot the SAA host?',
        'Warning: Cloud infrastructure will not be available until the SAA host has restarted.'
      ].join('\n');
      var confirmed = window.confirm(confirmation);
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
        }).then(function(xhr) {
          self.set('isActionPending', false);
          notify('Successfully rebooted SAA host', health.SUCCESS);
        }, function(xhr) {
          self.set('isActionPending', false);
          xhrError(xhr, 'Failed to reboot SAA host');
        });
      }
    },
    shutdown: function() {
      var self = this;
      var confirmation = [
        'Are you sure you want to shut down the SAA host?',
        'Warning: Cloud infrastructure will not be available until the SAA host is restarted.'
      ].join('\n');
      var confirmed = window.confirm(confirmation);
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
        }).then(function(xhr) {
          self.set('isActionPending', false);
          notify('Successfully shutdown SAA host', health.SUCCESS);
        }, function(xhr) {
          self.set('isActionPending', false);
          xhrError(xhr, 'Failed to shutdown SAA host');
        });
      }
    }
  }
});
