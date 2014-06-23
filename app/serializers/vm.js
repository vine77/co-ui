import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  normalize: function(type, hash, prop) {
    if (hash.id === 1) { hash.ipm_id = 0; }
    return this._super(type, hash, prop);
  },
});
