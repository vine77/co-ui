import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'fuel/api',
  buildURL: function(type, id) {
    return this._super(type, id) + '.json';
  }
});
