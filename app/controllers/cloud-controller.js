import Notify from "../helpers/notify";
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
        dataType: "json",
        type: "POST",
        data: {
          "co_version": null,
          "saa_version": null,
          "action": "reboot"
        }
      }).then( function() {
        //console.log('success');
      }, function() {
        //console.log('false');
      });
    }, 
    shutdown: function() {
      var ajaxPromise = this.get('ajaxPromise');
      var reboot = ajaxPromise('/api/v1/cc', {
        dataType: "json",
        type: "POST",
        data: {
          "co_version": null,
          "saa_version": null,
          "action": "shutdown"
        }
      }).then( function() {
        //Notify('Success');
        //console.log('success');
      }, function() {
        //Failure
      });
    }
  }
});
