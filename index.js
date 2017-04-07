/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-initials',

  included: function(app) {
    this._super.included(app);

    let shim = isFastBoot() ? 'md5-fastboot.js' : 'md5.js';

    app.import('vendor/ember-initials/md5.js');

    app.import('vendor/ember-initials/shims/' + shim, {
      type: 'vendor',
      exports: { md5: ['md5'] }
    });
  },

  md5Path() {
    return path.join(this.app.project.nodeModulesPath, 'blueimp-md5', 'js');
  },

  treeForVendor(tree) {
    let trees = [tree];

    trees.push(new Funnel(this.md5Path(), {
      destDir: 'ember-initials',
      files: ['md5.js']
    }));

    return mergeTrees(trees);
  },
}

// Checks to see whether this build is targeting FastBoot. Note that we cannot
// check this at boot time--the environment variable is only set once the build
// has started, which happens after this file is evaluated.
function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}
