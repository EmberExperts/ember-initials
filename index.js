/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-initials',

  included: function(app) {
    this._super.included(app);

    app.import('bower_components/blueimp-md5/js/md5.min.js');
  }
};
