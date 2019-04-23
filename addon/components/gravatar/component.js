import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import md5 from 'blueimp-md5';
import Image from '../image/component';

export default Image.extend({
  email: null,
  relativeUrl: false,

  defaultImage: reads('config.gravatar.defaultImageUrl'),

  src: computed('email', 'size', 'image', 'defaultImage', function() {
    return this.get('image') ? this.get('image') : this.generateGravatarUrl();
  }).readOnly(),

  generateGravatarUrl() {
    let hash = md5(this.get('email'));
    let size = this.get('size');
    let defaultImage = this.defaultImageUrl();
    let image = defaultImage ? `&default=${defaultImage}` : '';

    return `//www.gravatar.com/avatar/${hash}?size=${size}${image}`;
  },

  defaultImageUrl() {
    let defaultImage = this.get('defaultImage');
    return this.get('relativeUrl') && defaultImage ? this._absoluteImageSrc(defaultImage) : defaultImage;
  },

  _absoluteImageSrc(relativePath) {
    return `${window.location.origin}/${relativePath}`;
  }
});