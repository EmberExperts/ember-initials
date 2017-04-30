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
    let bufferedUrl = this.get(`initials`)[key];

    if (bufferedUrl) {
      return bufferedUrl;
    } else {
      return this.get('initials')[key] = generateImage(properties);
    }
  }
});
