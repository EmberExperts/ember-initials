import { assign } from '@ember/polyfills';
import { getOwner } from '@ember/application';
import { reads } from '@ember/object/computed';
import { computed } from '@ember/object';
import Mixin from '@ember/object/mixin';
import Config from 'ember-initials/config';
import md5 from 'md5';

export default Mixin.create({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src'],

  email: null,

  image: null,
  relativeUrl: false,
  defaultImage: computed(function() {
    return this.get('config.gravatar.defaultImage');
  }),

  size: 30,
  height: reads('size'),
  width: reads('size'),

  src: computed('email', 'size', 'image', 'defaultImage', function() {
    return this.get('image') ? this.get('image') : this.generateGravatarUrl();
  }),

  config: computed(function() {
    let appSettings = getOwner(this).resolveRegistration('config:environment').emberInitials || {};
    return assign({}, Config, appSettings);
  }),

  generateGravatarUrl() {
    let hash = md5(this.get('email'));
    let size = this.get('size');
    let defaultImage = this.defaultImageUrl();
    let image = defaultImage ? `&default=${defaultImage}` : '';

    return `//www.gravatar.com/avatar/${hash}?size=${size}${image}`;
  },

  defaultImageUrl() {
    if (this.get('relativeUrl') && this.get('defaultImage')) {
      return `${window.location.origin}/${this.get('defaultImage')}`;
    } else {
      return this.get('defaultImage');
    }
  }
});
