import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { reads } from '@ember/object/computed';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';

export default Mixin.create({
  avatarsStore: service('ember-initials-store'),

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

  onError() {}
});
