export default DS.RESTSerializer.extend({
  normalizePayload: function(type, payload) {
    payload.id = 'current';
    return {
      netconfig: [payload]
    };
  }
});
