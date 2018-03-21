'use strict';

module.exports = {
  name: 'ember-initials',

  included: function(app) {
    this._super.included(app);
    app.import('node_modules/blueimp-md5/js/md5.min.js', { using: [{ transformation: 'amd', as: 'md5' }]});
  }
}
