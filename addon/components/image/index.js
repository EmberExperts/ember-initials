import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { reads } from '@ember/object/computed';
import layout from './template';

class ImageAvatarComponent extends Component {
  layout = layout;
  tagName = '';

  @tracked image;
  @tracked size = 30;
  @tracked alt = 'User Avatar';
  @tracked title = 'User Avatar';

  @reads('size') height;
  @reads('size') width;
  @reads('config.image.defaultImageUrl') defaultImage;

  @tracked _src;

  get src() {
    return this._src || this.image || this.defaultImage;
  }

  set src(value) {
    return this._src = value;
  }

  get config() {
    return getOwner(this).resolveRegistration('config:environment').emberInitials;
  }

  @action
  onError(e) {
    if (this.defaultImage && this.image !== this.defaultImage) {
      e.srcElement.src = this.defaultImage
    }
  }
}

export default ImageAvatarComponent;
