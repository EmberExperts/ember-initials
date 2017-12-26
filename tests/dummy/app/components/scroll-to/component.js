import Component from '@ember/component';
import Ember$ from 'jquery';
import { next } from '@ember/runloop';

export default Component.extend({
  tagName: 'a',
  offset: -50,

  click() {
    next(() => {
      Ember$('html, body').animate({
        scrollTop: Ember$(this.get('href')).offset().top + this.get('offset')
      }, 1000);
    });
  }
});
