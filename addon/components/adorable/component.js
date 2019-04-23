import { computed } from '@ember/object';
import Image from '../image/component';

export default Image.extend({
  email: '',

  defaultImage: computed('email', 'size', function() {
    return this._adorableSrc(this.get('email'), this.get('size'));
  }).readOnly(),

  onError: computed('email', 'size', function() {
    return (e) => e.srcElement.src = this._adorableSrc(this.email, this.size)
  }).readOnly(),

  _adorableSrc(email, size) {
    return `https://api.adorable.io/avatars/${size}/${email}`;
  }
});
