import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
import md5 from 'blueimp-md5';
import Avatar from 'ember-initials/mixins/avatar';

export default Mixin.create(Avatar, {
  email: null,
  image: null,
  relativeUrl: false,

  defaultImage: computed(function() {
    return this.get('config.gravatar.defaultImage');
  }),

  src: computed('email', 'size', 'image', 'defaultImage', function() {
    return this.get('image') ? this.get('image') : this.generateGravatarUrl();
  }),

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
