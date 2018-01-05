import Store from 'ember-initials/utils/store';

export function initialize(appInstance) {
  appInstance.register('store:ember-initials', Store);
}

export default {
  initialize
};
