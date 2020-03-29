import Component from '@ember/component';
import { next } from '@ember/runloop';

export default Component.extend({
  tagName: 'a',
  offset: -50,

  click() {
    next(() => {
      const element = document.querySelector(this.href);
      const position = element.offsetTop + this.offset;

      window.scroll({ top: position, behavior: 'smooth' });
    });
  }
});
