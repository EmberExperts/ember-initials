import Ember from 'ember';

export default Ember.Mixin.create({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src', 'title', 'alt'],

  email: '',
  image: '',

  title: 'User Avatar',
  alt: 'User Avatar',

  size: 30,
  height: Ember.computed.reads('size'),
  width: Ember.computed.reads('size'),

  src: Ember.computed.or('image', 'adorable'),

  adorable: Ember.computed('email', 'size', function() {
    return `https://api.adorable.io/avatars/${this.get('size')}/${this.get('email')}`;
  })
});
