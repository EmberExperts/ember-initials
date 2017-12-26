import Store from 'ember-initials/utils/store';

export function initialize(application) {
  application.register('store:ember-initials', Store);
}

export default {
  initialize,
  name: 'ember-initials-store',
};
