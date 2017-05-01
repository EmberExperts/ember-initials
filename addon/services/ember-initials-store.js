import Ember from 'ember';
import hash from 'object-hash';
import SvgGenerator from '../utils/generators/svg';

const { computed, Service } = Ember;

export default Service.extend({
  initials: {},

  generator: computed(function() {
    return new SvgGenerator;
  }),

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
