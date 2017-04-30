/* eslint-env node */
define('object-hash', [], function() {
  'use strict';

  var objectHash = self.objectHash;
  delete self.objectHash;

  return {
    'default': objectHash
  };
});
