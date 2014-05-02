export default DS.Model.extend({
  ostf_sha: DS.attr('string'),
  fuelmain_sha: DS.attr('string'),
  astute_sha: DS.attr('string'),
  release: DS.attr('string'),
  nailgun_sha: DS.attr('string'),
  fuellib_sha: DS.attr('string'),
  mirantis: DS.attr('string'),
});
