import { assign } from '@ember/polyfills';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import { reads, or } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import Config from 'ember-initials/config';

export default Mixin.create({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src', 'title', 'alt'],

  image: null,
  defaultImage: reads('config.image.defaultImageUrl'),

  title: 'User Avatar',
  alt: 'User Avatar',
  size: 30,
  height: reads('size'),
  width: reads('size'),

  src: or('image', 'defaultImage'),

  config: computed(function() {
    let appSettings = getOwner(this).resolveRegistration('config:environment').emberInitials || {};
    return assign({}, Config, appSettings);
  })
});
