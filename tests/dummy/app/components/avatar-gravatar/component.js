import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  email: 'example@example.com',
  relativeUrl: true,
  size: 200,

  exampleName: 'gravatar',

  active: computed('activeExample', 'exampleName', function() {
    return this.activeExample === this.exampleName;
  }),

  visible: computed('activeExample', 'active', function() {
    return !this.activeExample || this.active;
  })
});
