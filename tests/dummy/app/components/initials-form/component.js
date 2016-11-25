import Ember from 'ember';

export default Ember.Component.extend({
  size: 150,
  name: 'Ember Initials',
  seedText: Ember.computed.reads('name'),
  defaultName: '?',
  textColor: 'white',
  fontSize: 100,
  fontWeight: 100,
  fontFamily: 'Helvetica Neue Light, Arial, sans-serif',
});
