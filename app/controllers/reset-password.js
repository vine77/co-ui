import health from '../utils/mappings/health';
import notify from '../utils/notify';
import xhrError from '../utils/xhr-error';

export default Ember.ObjectController.extend({
  needs: ['login'],
  isActionPending: false,
  actions: {
    resetPassword: function () {
      var self = this;
      if (!this.get('username')) {
        notify('Please enter your username in order to reset your password.');
      } else {
        this.set('isActionPending', true);
        return this.store.find('user', this.get('username')).then(function (user) {
          user.set('request', 'reset_password');
          return user.save().then(function () {
            self.set('isActionPending', false);
            notify('Password generated successfully. Your new password was sent via email.', health.SUCCESS);
            user.set('request', '');
            self.transitionTo('login');
          }, function (xhr) {
            self.set('isActionPending', false);
            user.set('request', '');
            xhrError(xhr, 'A password reset email was not sent due to an error. Note that temporary passwords can only be generated once every 120 mins.');
          });
        }, function (xhr) {
          self.set('isActionPending', false);
          xhrError(xhr, 'Could not find user. Please check your username and try again.');
        });
      }
    }
  }
});
