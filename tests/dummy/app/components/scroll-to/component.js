import Component from '@ember/component';
import { next } from '@ember/runloop';

export default Component.extend({
  tagName: 'a',
  offset: -50,

  click() {
    next(() => {
      let element = document.querySelector(this.href);
      let position = element.offsetTop + this.offset;

      window.scroll({ top: position, behavior: 'smooth' });
    });
  }
});
