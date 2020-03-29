'use strict';

module.exports = {
  root: true,

  env: {
    node: true,
    browser: true
  },

  plugins: ['zero-config'],

  extends: ['plugin:zero-config/browser'],

  rules: {
    'max-statements': 0,
    'max-lines-per-function': 0
  }
};
