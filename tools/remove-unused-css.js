const fs = require('fs');
const uncss = require('uncss');
const shell = require('shelljs');

const files = ['./dist/index.html'];

var options = {
  banner: false,
  // csspath: '../dist/css/',
  htmlroot: 'dist',
  ignore: ['#added_at_runtime', /test-[0-9]+/],
  ignoreSheets: [/fonts.googleapis/],
  inject: function(window) { window.document.querySelector('html').classList.add('no-csscalc', 'csscalc'); },
  jsdom: {
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)'
  },
  media: ['(min-width: 700px) handheld and (orientation: landscape)'],
  // raw: 'h1 { color: green }',
  report: false,
  // strictSSL: true,
  // stylesheets: ['lib/bootstrap/dist/css/bootstrap.css', 'src/public/css/main.css'],
  timeout: 1000,
  // uncssrc: '.uncssrc',
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X)'
};

uncss(files, options, function(error, output) {
  if (error) {
    console.log(error);
  }
  if (output) {
    shell.rm('./dist/css/styles.css');
    fs.writeFile('./dist/css/styles.css', output, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
  }
});
