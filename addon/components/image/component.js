import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { or, reads } from '@ember/object/computed';
import layout from './template';

export default Component.extend({
  layout,

  tagName: '',

  image: '',
  size: 30,
  alt: 'User Avatar',
  title: 'User Avatar',

  src: or('image', 'defaultImage'),

  height: reads('size'),
  width: reads('size'),
  defaultImage: reads('config.image.defaultImageUrl'),

  config: computed(function() {
    return getOwner(this).resolveRegistration('config:environment').emberInitials;
  }).readOnly(),

  onError() {}
});
