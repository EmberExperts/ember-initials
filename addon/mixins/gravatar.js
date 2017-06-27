import Ember from 'ember';
import Config from 'ember-initials/config';
import md5 from 'md5';

export default Ember.Mixin.create({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src'],

  email: null,

  image: null,
  relativeUrl: false,
  defaultImage: Ember.computed(function() {
    return this.get('config.gravatar.defaultImage');
  }),

  size: 30,
  height: Ember.computed.reads('size'),
  width: Ember.computed.reads('size'),

  src: Ember.computed('email', 'size', 'image', 'defaultImage', function() {
    return this.get('image') ? this.get('image') : this.generateGravatarUrl();
  }),

  config: Ember.computed(function() {
    let appSettings = Ember.getOwner(this).resolveRegistration('config:environment').emberInitials || {};
    return Ember.assign({}, Config, appSettings);
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
