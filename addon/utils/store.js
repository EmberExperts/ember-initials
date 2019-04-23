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
    const key = JSON.stringify(properties);
    return this.cache.get(key) || this._create(key, properties);
  },

  _create(key, properties) {
    const url = this.generator.generate(properties);
    return this.cache.set(key, url) && url;
  }
});
