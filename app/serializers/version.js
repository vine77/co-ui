export default DS.RESTSerializer.extend({
  normalizePayload: function(type, payload) {
    payload.id = 'current';
    return {
      versions: [payload]
    };
  }
});
