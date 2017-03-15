/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-initials',

  included: function(app) {
    this._super.included(app);
    let shim = isFastBoot() ? 'md5-fastboot.js' : 'md5.js';

    app.import(app.bowerDirectory + '/blueimp-md5/js/md5.min.js');
    app.import('vendor/ember-initials/' + shim, {
      type: 'vendor',
      exports: { 'md5': ['md5'] }
    });
  }
}

// Checks to see whether this build is targeting FastBoot. Note that we cannot
// check this at boot time--the environment variable is only set once the build
// has started, which happens after this file is evaluated.
function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}
