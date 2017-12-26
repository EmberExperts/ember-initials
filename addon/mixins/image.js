import Mixin from '@ember/object/mixin';
import Avatar from 'ember-initials/mixins/avatar';
import { reads, or } from '@ember/object/computed';

export default Mixin.create(Avatar, {
  image: '',

  src: or('image', 'defaultImage'),
  defaultImage: reads('config.image.defaultImageUrl'),
});
