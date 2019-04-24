import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { reads } from '@ember/object/computed';
import { computed, overridableComputed } from 'ember-initials/utils/computed';
import layout from './template';

export default Component.extend({
  layout,

  tagName: '',

  image: '',
  size: 30,
  alt: 'User Avatar',
  title: 'User Avatar',

  src: overridableComputed('image', 'defaultImage', function() {
    return this.image || this.defaultImage;
  }),

  height: reads('size'),
  width: reads('size'),
  defaultImage: reads('config.image.defaultImageUrl'),

  config: computed(function() {
    return getOwner(this).resolveRegistration('config:environment').emberInitials;
  }),

  onError() {}
});
