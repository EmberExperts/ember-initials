/* eslint-env node */
define('object-hash', [], function() {
  'use strict';

  var objectHash;

  if (typeof FastBoot != 'undefined') {
    objectHash = FastBoot.require('object-hash');
  } else {
    objectHash = self.objectHash;
    delete self.objectHash;
  }

  return {
    'default': objectHash
  };
});
