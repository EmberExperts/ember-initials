import EmberObject, { computed } from "@ember/object";
import SvgGenerator from '../utils/generators/svg';

export default EmberObject.extend({
  cache: null,

  generator: computed(function() {
    return new SvgGenerator;
  }).readOnly(),

  init() {
    this._super(...arguments);
    this.set('cache', new Map());
  },

  initialsFor(properties) {
    return this.cache.get(properties) || this._create(properties);
  },

  _create(properties) {
    const url = this.get('generator').generate(properties);
    return this.cache.set(properties, url) && url;
  }
});
