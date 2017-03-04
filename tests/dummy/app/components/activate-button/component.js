import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'activator',

  actions: {
    activate(value) {
      this.set('activeExample', value);
    },

    deactivate() {
      this.set('activeExample', null);
    }
  }
});
