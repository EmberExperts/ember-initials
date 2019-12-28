import ImageAvatarComponent from '../image';
import { tracked } from '@glimmer/tracking';
import { reads } from '@ember/object/computed';
import md5 from 'blueimp-md5';

class GravatarAvatarComponent extends ImageAvatarComponent {
  @tracked email = '';

  @reads('config.gravatar.defaultImageUrl') defaultImage;

  @tracked _image;

  get image() {
    return this._image || this.generateGravatarUrl();
  }

  set image(value) {
    return this._image = value;
  }

  generateGravatarUrl() {
    let hash = md5(this.email);
    let size = this.size;
    let url = this.defaultImage ? `&default=${new URL(this.defaultImage, window.location.origin).href}` : '';

    return `//www.gravatar.com/avatar/${hash}?size=${size}${url}`;
  }
}

export default GravatarAvatarComponent;
