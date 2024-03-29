import Ember from 'ember';
import DS from 'ember-data';
import health from '../utils/mappings/health';
import notify from '../utils/notify';
import xhrError from '../utils/xhr-error';
import apiDomain from '../utils/api-domain';

export default Ember.ObjectController.extend({
  init: function () {
    this._super();
    this.refreshSession();
    Ember.$.idleTimer(this.get('idleTimeout'));
  },
  idleTimeout: 15 * 60 * 1000,  // log out after 15 idle minutes
  isLoggedIn: false,
  isActionPending: false,
  tenantType: 'default',
  isDefaultTenant: Ember.computed.equal('tenantType', 'default'),
  tenantName: '',
  setHeaders: function () {
    var csrfToken = this.get('csrfToken');
    Ember.$.ajaxSetup({
      headers: {
        "X-CSRF-Token": csrfToken
      }
    });
  }.observes('csrfToken'),
  refreshSession: function () {
    var self = this;
    Ember.run.later(this, 'refreshSession', 20000);  // Refresh every 20 seconds
    if (this.get('isLoggedIn')) {
      if (Ember.$.idleTimer('isIdle')) {
        this.send('logout');
      } else {
        Ember.$.ajax(apiDomain() + '/api/v1/sessions.json', {
          type: 'POST',
          data: JSON.stringify({
            session: {
              request: 'refresh_ticket'
            }
          }),
          contentType: 'application/json',
          dataType: 'json'
        }).then(function() {}, function() {
          self.send('logout');
        });
      }
    }
  },
  transitionToAttempted: function () {
    var attemptedTransition = this.get('attemptedTransition');
    if (attemptedTransition) {
      try {
        if (typeof attemptedTransition === 'string') {
          if (attemptedTransition.indexOf('app.data.') === 0) attemptedTransition = attemptedTransition.slice(9);
          if (attemptedTransition.indexOf('app.') === 0) attemptedTransition = attemptedTransition.slice(4);
          this.transitionToRoute(attemptedTransition);
        } else {
          this.get('attemptedTransition').retry();
        }
        this.set('attemptedTransition', null);
      } catch (error) {
        this.transitionToRoute('index');
        this.set('attemptedTransition', null);
      }
    } else {
      this.transitionToRoute('index');
      this.set('attemptedTransition', null);
    }
  },
  actions: {
    login: function () {
      var self = this;
      this.set('isActionPending', true);
      var session = this.get('model');
      session.save().then(function (session) {
        self.set('isActionPending', false);
        self.set('isLoggedIn', true);
        self.transitionToAttempted();
      }, function (xhr) {
        var changePassword = false;
        self.set('isActionPending', false);
        try {
          if (xhr.responseJSON.errors.message.change_password) changePassword = true;
        } catch(error) {}
        if (changePassword || xhr.status === 422 || xhr instanceof DS.InvalidError) {
          var csrfToken = xhr.responseJSON && xhr.responseJSON.errors && xhr.responseJSON.errors.message.csrf_token;
          if (csrfToken) self.set('csrfToken', csrfToken);
          notify('Please change your password.');
          self.transitionToRoute('profile', self.get('username'));
        } else if (xhr.status === 401) {
          notify('The username or password you entered was incorrect. Please try again.', health.ERROR);
          self.set('username', '');
          self.set('password', '');
          Ember.$('#login-username').focus();
        } else {
          xhrError(xhr, 'An error occurred while attempting to log in.');
        }
      });
    }
  }
});
