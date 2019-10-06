// CSS Imports *include in entry file only
import '../css/fonts.css';
import '../scss/bootstrap.scss';
import '../scss/custom.scss';
import '../css/custom.css';

/* Boostrap 4 Full Bundles */
import 'bootstrap/dist/js/bootstrap.bundle'; /* Includes popper.js */
// import 'bootstrap'; /* Does not include popper. js */

/* Boostrap 4 Individual Components (Optional) */
// import 'bootstrap/js/dist/alert';
// import 'bootstrap/js/dist/button';
// import 'bootstrap/js/dist/carousel';
// import 'bootstrap/js/dist/collapse';
// import 'bootstrap/js/dist/dropdown'; /* requires popper.js - Uncomment 'popper.js' in webpack.config.js */
// import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/popover';
// import 'bootstrap/js/dist/scrollspy';
// import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/tooltip'; /* requires popper.js - Uncomment 'popper.js' in webpack.config.js */
// import 'bootstrap/js/dist/util';

/* If in development mode, watch for changes to html files */
if (process.env.NODE_ENV === 'development') {
  const glob = require('glob');
  const path = require('path');

  require('../index.html');
  glob.sync('./templates/**/*.js').forEach(function(file) {
    require(path.resolve(file));
  });
}
