import Ember from 'ember';

export default Ember.Component.extend({
  name: 'Ember Initials',
  defaultName: '?',
  seedText: Ember.computed.reads('name'),

  size: '200',
  textColor: 'white',
  fontSize: 55,
  fontWeight: 100,
  fontFamily: 'Helvetica Neue Light, Arial, sans-serif',

  exampleName: 'initials',

  active: Ember.computed('activeExample', 'exampleName', function() {
    return this.get('activeExample') === this.get('exampleName');
  }),

  visible: Ember.computed('activeExample', 'active', function() {
    return !this.get('activeExample') || this.get('active');
  })
});
