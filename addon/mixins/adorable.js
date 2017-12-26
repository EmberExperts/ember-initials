import Mixin from '@ember/object/mixin';
import Avatar from 'ember-initials/mixins/avatar';
import { computed } from '@ember/object';

export default Mixin.create(Avatar, {
  email: '',
  image: '',

  src: computed('image', 'email', 'size', function() {
    return this.get('image') || this._adorableSrc(this.get('email'), this.get('size'));
  }),

  _adorableSrc(email, size) {
    return `https://api.adorable.io/avatars/${size}/${email}`;
  }
});
