import Ember from 'ember';
import health from '../utils/mappings/health';
import notify from '../utils/notify';
import xhrError from '../utils/xhr-error';

export default Ember.ObjectController.extend({
  needs: ['login'],
  actions: {
    changePassword: function(route) {
      var self = this;
      var user = this.get('model');
      if (this.get('password') !== this.get('passwordRepeat')) {
        notify('Passwords do not match. Please try again.', health.ERROR);
        this.set('password', '');
        this.set('passwordRepeat', '');
        Ember.$('#login-password').focus();
      } else {
        user.setProperties({
          username: this.get('username'),
          oldPassword: this.get('controllers.login.password'),
          newPassword: this.get('password'),
          email: this.get('email')
        });
        this.set('isActionPending', true);
        return user.save().then(function() {
          self.get('controllers.login').set('password', self.get('password'));
          return self.get('controllers.login.model').save().then(function(session) {
            self.set('isActionPending', false);
            self.get('controllers.login').set('isLoggedIn', true);
            self.get('controllers.login').transitionToAttempted();
            notify('Your password was updated successfully.', health.SUCCESS);
          }, function(xhr) {
            self.set('isActionPending', false);
            self.get('controllers.login').set('isLoggedIn', false);
            xhrError(xhr, 'An error occurred while attempting to update your password.', health.ERROR);
          });
        }, function(xhr) {
          self.set('isActionPending', false);
          xhrError(xhr, 'An error occurred while attempting to update your password.', health.ERROR);
        });
      }
    }
  }
});
