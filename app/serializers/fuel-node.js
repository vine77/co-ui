import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  /**
    Patch the extractFindAll method to unload records not present in
    findAll requests, and ignore "isEditing" records.
  */
  extractFindAll: function(store, type, payload) {
    var missingRecords = [];
    var editingRecords = [];
    store.all(type).forEach(function (item, index, enumerable) {
      var payloadIds = payload.map(function(item) {
        return item.id + '';
      });
      var isMissing = (payloadIds.indexOf(item.get('id').toString()) === -1);
      if (isMissing) missingRecords.push(item);
      if (item.get('isEditing')) editingRecords.push(item);
    });
    var extracted = this._super(store, type, payload);
    missingRecords.forEach(function(item, index, enumerable) {
      if (!item.get('isDirty')) item.unloadRecord();
    });
    return extracted.filter(function(item, index, enumerable) {
      return editingRecords.mapBy('id').indexOf(item.id) === -1;
    });
  }
});
