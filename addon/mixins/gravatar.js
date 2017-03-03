import Ember from 'ember';

export default Ember.Mixin.create({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src'],

  image: null,
  email: null,

  size: 30,
  height: Ember.computed.reads('size'),
  width: Ember.computed.reads('size'),

  src: Ember.computed('email', 'size', 'image', function() {
    let hash = md5(this.get('email'));
    let size = this.get('size');
    let image = this.get('image');
    let defaultImage = image ? `&default=${image}` : '';

    return `//www.gravatar.com/avatar/${hash}?size=${size}${defaultImage}`;
  }),
});
