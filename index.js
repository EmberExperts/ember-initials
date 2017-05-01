/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-initials',

  included: function(app) {
    this._super.included(app);

    app.import('vendor/ember-initials/md5.js');
    app.import('vendor/shims/md5/' + shimFor('md5'), {
      type: 'vendor'
    });

    app.import('vendor/ember-initials/object_hash.js');
    app.import('vendor/shims/object-hash/' + shimFor('object-hash'), {
      type: 'vendor'
    });
  },

  md5Path() {
    return path.join(this.app.project.nodeModulesPath, 'blueimp-md5', 'js');
  },

  objectHashPath() {
    return path.join(this.app.project.nodeModulesPath, 'object-hash', 'dist');
  },

  treeForVendor(tree) {
    let trees = [tree];

    trees.push(new Funnel(this.md5Path(), {
      destDir: 'ember-initials',
      files: ['md5.js']
    }));

    trees.push(new Funnel(this.objectHashPath(), {
      destDir: 'ember-initials',
      files: ['object_hash.js']
    }));

    return mergeTrees(trees);
  }
}

function shimFor(name) {
  return isFastBoot() ? `${name}-fastboot.js` : `${name}.js`;
}

// Checks to see whether this build is targeting FastBoot. Note that we cannot
// check this at boot time--the environment variable is only set once the build
// has started, which happens after this file is evaluated.
function isFastBoot() {
  return process.env.EMBER_CLI_FASTBOOT === 'true';
}
