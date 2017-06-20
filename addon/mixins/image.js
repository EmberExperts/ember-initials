import Ember from 'ember';
import Config from 'ember-initials/config';

export default Ember.Mixin.create({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src', 'title', 'alt'],

  image: null,
  defaultImage: Ember.computed.reads('config.image.defaultImageUrl'),

  title: 'User Avatar',
  alt: 'User Avatar',
  size: 30,
  height: Ember.computed.reads('size'),
  width: Ember.computed.reads('size'),

  src: Ember.computed.or('image', 'defaultImage'),

  config: Ember.computed(function() {
    let appSettings = Ember.getOwner(this).resolveRegistration('config:environment').emberInitials || {};
    return Ember.assign({}, Config, appSettings);
  })
});
