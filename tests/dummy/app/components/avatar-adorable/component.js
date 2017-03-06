import Ember from 'ember';

export default Ember.Component.extend({
  email: 'exelord@github.com',
  size: 200,

  exampleName: 'adorable',

  active: Ember.computed('activeExample', 'exampleName', function() {
    return this.get('activeExample') === this.get('exampleName');
  }),

  visible: Ember.computed('activeExample', 'active', function() {
    return !this.get('activeExample') || this.get('active');
  })
});
