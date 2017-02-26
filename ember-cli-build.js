/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  var config = defaults.project.config(EmberAddon.env());

  var app = new EmberAddon(defaults, {
    sassOptions: {
      extension: 'sass',
    },
    fingerprint: {
      exclude: ['apple-touch-icon', 'favicon', 'mstile']
    },
    favicons: {
      faviconsConfig: {
        appName: 'Ember Initials',
        appDescription: 'Ember Initials is a package for generating simple avatars with users initials. It support Ember 2 apps. Thanks to highly customizable interface you can define your own colors, defaults and styles.',
        developerName: 'Exelord',
        developerURL: 'www.macsour.com',
        background: '#ffffff',
        path: config.rootURL,  // Path for overriding default icons path. `string`
        url: 'https://exelord.github.io/ember-initials/images/og-image.jpg',  // Absolute URL for OpenGraph image. `string`
      }
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
