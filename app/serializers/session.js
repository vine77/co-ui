import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  // Add ID
  extractSingle: function(store, type, payload, id, requestType) {
    payload.session.id = 'current_session';
    return this._super(store, type, payload, id, requestType);
  }
});
