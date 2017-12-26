import Mixin from '@ember/object/mixin';
import { reads } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';

export default Mixin.create({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src', 'alt', 'title', 'onError'],

  src: '',
  size: 30,
  alt: 'User Avatar',
  title: 'User Avatar',

  height: reads('size'),
  width: reads('size'),

  config: computed(function() {
    return getOwner(this).resolveRegistration('config:environment').emberInitials;
  }),

  fastboot: computed(function() {
    return getOwner(this).lookup('service:fastboot');
  }),

  avatarsStore: computed(function() {
    return getOwner(this).lookup('store:ember-initials');
  }),

  onError() {}
});
