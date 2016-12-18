import Ember from 'ember';

export default Ember.Component.extend({
  size: '150',
  name: 'Ember Initials',
  seedText: Ember.computed.reads('name'),
  defaultName: '?',
  textColor: 'white',
  fontSize: 70,
  fontWeight: 100,
  fontFamily: 'Helvetica Neue Light, Arial, sans-serif',

  sizeChanged: Ember.computed('size', function() {
    return this.get('size') !== '150';
  }),
});
