/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var trees = [];

var app = new EmberApp({
  name: require('./package.json').name,

  minifyCSS: {
    enabled: true,
    options: {}
  },

  getEnvJSON: require('./config/environment')
});

// Use this to add additional libraries to the generated output files.
app.import('vendor/ember-data/ember-data.js');

// If the library that you are including contains AMD or ES6 modules that
// you would like to import into your application please specify an
// object with the list of modules as keys along with the exports of each
// module as its value.
app.import('vendor/ic-ajax/dist/named-amd/main.js', {
  'ic-ajax': [
    'default',
    'defineFixture',
    'lookupFixture',
    'raw',
    'request',
  ]
});

// Import app-specific dependencies
app.import('vendor/bootstrap/dist/js/bootstrap.js');
app.import('vendor/pnotify/pnotify.js');
app.import('vendor/jquery-cookie/jquery.cookie.js');
app.import('vendor/d3/d3.js');
app.import('vendor/crossfilter/crossfilter.js');
app.import('vendor/dcjs/dc.js');

trees.push(pickFiles('vendor', {
  srcDir: '/fontawesome/fonts',
  files: ['*.woff', '*.ttf', '*.svg', '*.eot'],
  destDir: '/fonts'
}));

trees.push(pickFiles('vendor', {
  srcDir: '/bootstrap/fonts',
  files: ['*.woff', '*.ttf', '*.svg', '*.eot'],
  destDir: '/fonts'
}));

trees.push(app.toTree());
module.exports = mergeTrees(trees);
