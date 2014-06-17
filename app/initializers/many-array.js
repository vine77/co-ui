export default {
  name: 'many-array',
  initialize: function(container, application) {
    // http://jsfiddle.net/H6Gqf/
    DS.ManyArray.reopen({
      reloadLinks: function() {
        var owner = this.get('owner');
        var name = this.get('name');
        var resolver = Ember.RSVP.defer();
        var meta = owner.constructor.metaForProperty(name);
        var link = owner._data.links[meta.key];
        return this.get('store').findHasMany(owner, link, meta, resolver);
      }
    });
  }
};
