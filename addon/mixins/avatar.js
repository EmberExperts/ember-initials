import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),

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

  onError() {}
});
