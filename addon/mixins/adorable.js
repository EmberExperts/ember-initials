import { computed } from '@ember/object';
import { reads, or } from '@ember/object/computed';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  tagName: 'img',
  attributeBindings: ['width', 'height', 'src', 'title', 'alt'],

  email: '',
  image: '',

  title: 'User Avatar',
  alt: 'User Avatar',

  size: 30,
  height: reads('size'),
  width: reads('size'),

  src: or('image', 'adorable'),

  adorable: computed('email', 'size', function() {
    return `https://api.adorable.io/avatars/${this.get('size')}/${this.get('email')}`;
  })
});
