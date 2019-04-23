import Component from '@ember/component';
import { next } from '@ember/runloop';

export default Component.extend({
  tagName: 'a',
  offset: -50,

  click() {
    next(() => {
      let element = document.querySelector(this.get('href'));
      let position = element.offsetTop + this.get('offset');

      window.scroll({ top: position, behavior: 'smooth' });
    });
  }
});
