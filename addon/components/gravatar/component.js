import { reads } from '@ember/object/computed';
import md5 from 'blueimp-md5';
import { computed } from 'ember-initials/utils/computed';
import Image from '../image/component';

export default Image.extend({
  email: null,
  relativeUrl: false,

  defaultImage: reads('config.gravatar.defaultImageUrl'),

  src: computed('email', 'size', 'image', 'defaultImage', function() {
    return this.image ? this.image : this.generateGravatarUrl();
  }),

  generateGravatarUrl() {
    let hash = md5(this.email);
    let size = this.size;
    let defaultImage = this.defaultImageUrl();
    let image = defaultImage ? `&default=${defaultImage}` : '';

    return `//www.gravatar.com/avatar/${hash}?size=${size}${image}`;
  },

  defaultImageUrl() {
    let defaultImage = this.defaultImage;
    return this.relativeUrl && defaultImage ? this._absoluteImageSrc(defaultImage) : defaultImage;
  },

  _absoluteImageSrc(relativePath) {
    return `${window.location.origin}/${relativePath}`;
  }
});
