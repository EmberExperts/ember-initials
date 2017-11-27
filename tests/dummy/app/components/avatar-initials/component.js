import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  name: 'Ember Initials',
  defaultName: '?',
  seedText: reads('name'),

  size: '200',
  textColor: 'white',
  fontSize: 55,
  fontWeight: 100,
  fontFamily: 'Helvetica Neue Light, Arial, sans-serif',

  exampleName: 'initials',

  active: computed('activeExample', 'exampleName', function() {
    return this.get('activeExample') === this.get('exampleName');
  }),

  visible: computed('activeExample', 'active', function() {
    return !this.get('activeExample') || this.get('active');
  })
});
