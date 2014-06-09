export default Ember.ObjectController.extend({
  isDisabled: function() {
    switch (this.get('method')) {
      case 'start':
        return this.get('vm.isSaaAppliance') && !this.get('vm.ipm.cluster');
      default:
        return false;
    }
  }.property('method', 'vm.isSaaAppliance', 'vm.ipm.cluster'),
  isDisabledMessage: function() {
    if (this.get('isDisabled') && this.get('method') === 'start') {
      return 'You must first attach the SAAappliance to a cluster before starting.';
    }
  }.property('isDisabled'),
  isFirstAction: function() {
    if (this.get('vm.isRunning')) {
      if (this.get('method') === 'reboot') {
        return true;
      }
    } else {
      if (this.get('method') === 'start') {
        return true;
      }
    }
    return false;
  }.property('method', 'vm.isRunning'),
  isVisible: function() {
    if (this.get('showAllActions')) {
      return true;
    } else {
      switch (this.get('method')) {
        case 'start':
          return this.get('vm.state') !== 1 && this.get('vm.state') !== 4;
        case 'reboot':
          return this.get('vm.state') === 1;
        case 'shutdown':
          return this.get('vm.state') === 1;
        case 'forcedShutdown':
          return this.get('vm.state') === 1 || this.get('vm.state') === 4;
        default:
          return false;
      }
    }
  }.property('vm.method', 'vm.state', 'showAllActions'),
  showAllActions: function() {
    switch (this.get('vm.state')) {
      case 0: // NOSTATE
        return true;
      case 2: // BLOCKED
        return true;
      case 3: // PAUSED
        return true;
      case 6: // CRASHED
        return true;
      default:
        return false;
    }
  }.property('vm.state'),
  actions: {
    performAction: function(method) {
      this.get('vm').send(method);
    }
  }
});