import Ember from 'ember';
import notify from '../../utils/notify';
import xhrError from '../../utils/xhr-error';
import health from '../../utils/mappings/health';

export default Ember.ObjectController.extend({
  isActionPending: false,
  isTestEmailActionPending: false,
  actions: {
    save: function() {
      var self = this;
      var mailserver = this.get('model');
      this.set('isActionPending', true);
      mailserver.save().then(function() {
        self.set('isActionPending', false);
        notify('Successfully updated mail server settings.', health.SUCCESS);
      }, function(xhr) {
        self.set('isActionPending', false);
        xhrError(xhr, 'Failed to update mail server settings.');
      });
    },
    cancel: function() {
      this.get('model').rollback();
    },
    testEmail: function() {
      var self = this;
      var mailserver = this.get('model');
      mailserver.set('request', 'test');
      this.set('isTestEmailActionPending', true);
      mailserver.save().then(function() {
        self.set('isTestEmailActionPending', false);
        mailserver.set('request', '');
        notify('Sent test email to ' + mailserver.get('sender_email') + '.', health.SUCCESS);
      }, function(xhr) {
        self.set('isTestEmailActionPending', false);
        mailserver.set('request', '');
        xhrError(xhr, 'Failed to send test email.');
      });
    }
  }
});
