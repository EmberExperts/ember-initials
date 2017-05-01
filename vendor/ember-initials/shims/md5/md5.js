/* eslint-env node */
define('md5', [], function() {
  'use strict';

  var md5 = self.md5;
  delete self.md5

  return {
    'default': md5
  };
});
