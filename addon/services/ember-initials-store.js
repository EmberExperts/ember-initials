import Service from '@ember/service';
import { computed } from '@ember/object';
import SvgGenerator from '../utils/generators/svg';
import hash from 'ember-initials/utils/hash';

export default Service.extend({
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
    let key = hash(properties);
    return this.get('cache')[key] || this._create(key, properties);
  },

  _create(key, properties) {
    return this.get('cache')[key] = this.get('generator').generate(properties);
  }
});
