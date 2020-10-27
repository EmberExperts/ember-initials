import ImageAvatarComponent from '../image';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class AdorableAvatarComponent extends ImageAvatarComponent {
  @tracked email = '';

  get defaultImage() {
    return this._defaultImage || this._adorableSrc(this.email, this.size);
  }

  set defaultImage(value) {
    return this._defaultImage = value;
  }

  @action
  onError(e) {
    e.srcElement.src = this._adorableSrc(this.email, this.size);
  }

  _adorableSrc(email, size) {
    return `https://api.hello-avatar.com/adorables/${size}/${email}`;
  }
}

export default AdorableAvatarComponent;
