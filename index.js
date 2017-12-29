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
    app.import('vendor/shims/md5.js', { type: 'vendor' });
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
  }
}
