import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  email: 'exelord@github.com',
  size: 200,

  exampleName: 'adorable',

  active: computed('activeExample', 'exampleName', function() {
    return this.get('activeExample') === this.get('exampleName');
  }),

  visible: computed('activeExample', 'active', function() {
    return !this.get('activeExample') || this.get('active');
  })
});
