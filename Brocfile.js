/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var removeFiles = require('broccoli-file-remover');
var rev = require('broccoli-rev');
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
tree = mergeTrees(trees);

// Add file revision checksums (cache killer)
revTree = mergeTrees([rev(pickFiles(tree, {
  srcDir: '/assets',
  files: ['co-ui.js', 'co-ui.css'],
  destDir: '/assets'
}), {
  hashLength: 4
}), removeFiles(tree, {
  files: ['/assets/co-ui.js', '/assets/co-ui.css']
})]);

// Insert revved file names in HTML
rewrittenTree = rev.rewriter(revTree, {
  inputFile: 'index.html',
  outputFile: 'index.html'
});

module.exports = rewrittenTree;
