import { computed } from '@ember/object';
import Service from '@ember/service';
import hash from 'object-hash';
import SvgGenerator from '../utils/generators/svg';

export default Service.extend({
  initials: null,

  generator: computed(function() {
    return new SvgGenerator;
  }),

  init() {
    this._super(...arguments);
    this.set('initials', {});
  },

  removeAll() {
    Object.keys(this.get(`initials`)).forEach((key) => this.get('generator').revoke(key))
    this.set('initials', {});
  },

  initialsFor(properties) {
    let key = hash(properties);
    return this.get(`initials`)[key] || this._create(key, properties);
  },

  _create(key, properties) {
    return this.get('initials')[key] = this.get('generator').generate(properties);
  }
});
