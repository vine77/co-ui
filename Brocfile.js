/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var app = new EmberApp();

var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var trees = [];

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
tree = mergeTrees(trees);

module.exports = tree;
