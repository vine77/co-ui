export default DS.ActiveModelSerializer.extend({
  normalizePayload: function(type, payload) {
    payload.id = 'current';
    return {
      cloud_controllers: [payload]
    };
  }
});
