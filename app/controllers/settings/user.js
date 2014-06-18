import notify from '../../utils/notify';
import xhrError from '../../utils/xhr-error';
import health from '../../utils/mappings/health';

export default Ember.ObjectController.extend({
  isActionPending: false,
  actions: {
    save: function () {
      var self = this;
      var user = this.get('model');
      var isAllEmpty = !this.get('oldPassword') && !this.get('newPassword') && !this.get('confirmPassword');
      var isAllFilled = !!this.get('oldPassword') && !!this.get('newPassword') && !!this.get('confirmPassword');
      var passwordMismatch = this.get('newPassword') !== this.get('confirmPassword') && (!!this.get('newPassword') || !!this.get('confirmPassword'))
      if (!(isAllEmpty || isAllFilled)) {
        notify('Please enter all of the required fields.');
      } else if (passwordMismatch) {
        notify('Passwords do not match. Please try again.');
        this.set('newPassword', '');
        this.set('confirmPassword', '');
        $('#user-newPassword').focus();
      } else {
        this.set('isActionPending', true);
        return user.save().then(function () {
          self.set('isActionPending', false);
          notify('Your user account was updated successfully.', health.SUCCESS);
          self.set('oldPassword', '');
          self.set('newPassword', '');
          self.set('confirmPassword', '');
          $('#user-email').focus();
        }, function (xhr) {
          self.set('isActionPending', false);
          xhrError(xhr, 'An error occurred while attempting to update your user account.');
          self.set('oldPassword', '');
          self.set('newPassword', '');
          self.set('confirmPassword', '');
          $('#user-email').focus();
        });
      }
    },
    cancel: function () {
      this.get('model').rollback();
      this.set('confirmPassword', '');
      $('#user-email').focus();
    }
  }
});
