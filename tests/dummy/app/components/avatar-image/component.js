import Ember from 'ember';

export default Ember.Component.extend({
  image: 'images/default.jpg',
  size: 200,

  exampleName: 'image',

  active: Ember.computed('activeExample', 'exampleName', function() {
    return this.get('activeExample') === this.get('exampleName');
  }),

  visible: Ember.computed('activeExample', 'active', function() {
    return !this.get('activeExample') || this.get('active');
  })
});
