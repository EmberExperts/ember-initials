import Ember from 'ember';

export default Ember.Mixin.create({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src', 'title', 'alt'],

  image: null,
  defaultImage: 'http://pickurflick.com/assets/frontend/images/avt-default.jpg',

  title: 'Avatar',
  alt: 'Avatar',
  size: 30,
  height: Ember.computed.reads('size'),
  width: Ember.computed.reads('size'),

  src: Ember.computed.or('image', 'defaultImage'),
});
