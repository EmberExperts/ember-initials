import { computed } from '@ember/object';
import EmberObject from "@ember/object";
import md5 from 'md5';
import SvgGenerator from '../utils/generators/svg';
import { typeOf } from '@ember/utils';
export default EmberObject.extend({
  cache: null,

  generator: computed(function() {
    return new SvgGenerator;
  }),

  init() {
    this._super(...arguments);
    this.set('cache', {});
  },

  removeAll() {
    Object.keys(this.get(`cache`)).forEach((key) => this.get('generator').revoke(key))
    this.set('cache', {});
  },

  initialsFor(properties) {
    let hashableProp = this._ensureHashable(properties);
    let key = md5(hashableProp);
    return this.get('cache')[key] || this._create(key, properties);
  },

  _create(key, properties) {
    return this.get('cache')[key] = this.get('generator').generate(properties);
  },

  _ensureHashable(properties) {
    if (typeOf(properties) !== 'object') {
      // this should never happen, but just in case
      return properties.toString();
    }

    let pKeys = Object.keys(properties).sort();
    let result = [];
    pKeys.forEach((key) => {
      result.concat([key, properties[key]]);
    });
    return result.toString();
  }
});
