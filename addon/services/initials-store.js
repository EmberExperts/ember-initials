import Ember from 'ember';
import hash from 'object-hash';
import { generateImage } from '../mixins/initials/-private/generators';

export default Ember.Service.extend({
  initials: {},

  removeCache() {
    this.set('initials', {});
  },

  initialsFor(properties) {
    let key = hash(properties);
    return this.get(`initials`)[key] || this._create(key, properties);
  },

  _create(key, properties) {
    return this.get('initials')[key] = generateImage(properties);
  }
});
