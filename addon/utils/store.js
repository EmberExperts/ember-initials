import EmberObject, { computed } from "@ember/object";
import svgToMiniDataURI from 'mini-svg-data-uri';
import SvgGenerator from '../utils/generators/svg';

export default EmberObject.extend({
  cache: null,

  svgGenerator: computed(function() {
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
    const element = this.svgGenerator.generate(properties);
    const data = svgToMiniDataURI(element);

    return this.cache.set(key, data) && data;
  }
});
