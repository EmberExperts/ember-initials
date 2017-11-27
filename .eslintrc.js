module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    'browser': true
  },
  globals: {
    define: true,
    FastBoot: true
  },
  rules: {
    'ember/use-ember-get-and-set': 0
  }
};
