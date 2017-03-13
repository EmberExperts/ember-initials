import Ember from 'ember';

export default Ember.Component.extend({
  email: 'example@example.com',
  relativeUrl: true,
  size: 200,

  exampleName: 'gravatar',

  active: Ember.computed('activeExample', 'exampleName', function() {
    return this.get('activeExample') === this.get('exampleName');
  }),

  visible: Ember.computed('activeExample', 'active', function() {
    return !this.get('activeExample') || this.get('active');
  }),
});
