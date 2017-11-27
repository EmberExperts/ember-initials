import Component from '@ember/component';

export default Component.extend({
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
