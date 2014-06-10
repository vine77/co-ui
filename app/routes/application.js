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
    goToIngredient: function(location) {
      var map = {
        dashboard: '/ipm00/#/app/dashboard',
        nodes: '/ipm00/#/app/data/nodes',
        vms: '/ipm00/#/app/data/vms',
        services: '/ipm00/#/app/data/services',
        trust: '/ipm00/#/app/data/trust',
        settings: '/ipm00/#/app/settings'
      };
      this.controllerFor('ingredient').set('iframeSrc', map[location]);
      this.transitionTo('ingredient');
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
