'use strict';

module.exports = {
  root: true,

  plugins: ['zero-config'],

  extends: ['plugin:zero-config/ember'],

  rules: {
    'ember/no-classic-components': 0,
    'ember/no-computed-properties-in-native-classes': 0
  }
};
