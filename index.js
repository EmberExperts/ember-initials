/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-initials',

  included: function() {
    this._super.included.apply(this, arguments);
    let target = this._findHost();
    this.import('node_modules/blueimp-md5/js/md5.min.js', { using: [{ transformation: 'amd', as: 'md5' }]});
  }
}
