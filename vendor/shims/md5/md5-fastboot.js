/* eslint-env node */
define('md5', [], function() {
  return {
    'default': FastBoot.require('blueimp-md5')
  };
});
