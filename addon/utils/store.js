import EmberObject, { computed } from "@ember/object";
import SvgGenerator from '../utils/generators/svg';
import hash from '../utils/hash';

export default EmberObject.extend({
  cache: null,

  generator: computed(function() {
    return new SvgGenerator;
  }).readOnly(),

  init() {
    this._super(...arguments);
    this.set('cache', {});
  },

  initialsFor(properties) {
    let key = hash(properties);
    return this.get('cache')[key] || this._create(key, properties);
  },

  _create(key, properties) {
    return this.get('cache')[key] = this.get('generator').generate(properties);
  }
});
