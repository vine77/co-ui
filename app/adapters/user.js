import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  namespace: 'api/v1',
  buildURL: function(type, id) {
    return this._super(type, id) + '.json';
  }
});
