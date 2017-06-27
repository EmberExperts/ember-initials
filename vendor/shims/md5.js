/* eslint-env node */
define('md5', [], function() {
  'use strict';

  var md5;

  if (typeof FastBoot != 'undefined') {
    md5 = FastBoot.require('blueimp-md5');
  } else {
    md5 = self.md5;
    delete self.md5;
  }

  return {
    'default': md5
  };
});
