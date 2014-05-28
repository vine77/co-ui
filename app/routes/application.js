import apiDomain from '../utils/api-domain';

export default Ember.Route.extend({
  beforeModel: function() {
    var self = this;
    window.store = this.store;
    window.route = this;
    return Ember.RSVP.allSettled([
      this.store.find('session', 'current_session').then(function() {
        self.controllerFor('login').set('isLoggedIn', true);
        self.controllerFor('login').set('model', self.store.getById('session', 'current_session'));
      }, function() {
        self.controllerFor('login').set('isLoggedIn', false);
        self.store.unloadRecord(self.store.getById('session', 'current_session'));
        self.controllerFor('login').set('model', self.store.createRecord('session', {id: 'current_session'}));
      })
    ]);
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    //this.controllerFor('login').set('model', );
    this.controllerFor('cloudController').set('model', this.store.getById('cloudController', 'current'));
    this.controllerFor('vms').set('model', this.store.all('vm'));
    this.controllerFor('clusters').set('model', this.store.all('cluster'));
    this.controllerFor('ipms').set('model', this.store.all('ipm'));
  },
  removeCookies: function() {
    Ember.$.removeCookie('auth_pubtkt');
    Ember.$.removeCookie('csrftoken');
    Ember.$.removeCookie('samwebsession');
  },
  actions: {
    goToDashboard: function() {
      this.transitionTo('app.dashboard');
    },
    goToInfrastructure: function() {
      this.transitionTo('app.control-panel');
      this.controllerFor('app/control-panel').set('viewName', 'infrastructure');
    },
    goToClouds: function() {
      this.transitionTo('app.control-panel');
      this.controllerFor('app/control-panel').set('viewName', 'clouds');
    },
    logout: function() {
      var self = this;
      this.controllerFor('login').set('isLoggedIn', false);
      this.controllerFor('login').get('model').unloadRecord();
      this.controllerFor('login').set('model', this.store.createRecord('session', {id: 'current_session'}));
      Ember.$.ajax(apiDomain() + '/api/v1/sessions/current_session.json', {type: 'DELETE'}).always(function() {
        self.removeCookies();
        self.transitionTo('login');
      });
    }
  }
});
