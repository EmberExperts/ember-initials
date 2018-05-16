'use strict';

module.exports = {
  name: 'ember-initials',

  included: function() {
    this._super.included.apply(this, arguments);
    let target = this._findHost();
    target.import('node_modules/blueimp-md5/js/md5.min.js', { using: [{ transformation: 'amd', as: 'md5' }]});
  }
}
