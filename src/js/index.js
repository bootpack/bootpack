import '../css/main.css';

/* Boostrap 4 Full Bundles */
import 'bootstrap/src/js/bootstrap.bundle'; /* Includes popper.js */
// import 'bootstrap'; /* Does not include popper. js */

/* Bootstrap 4 Tooltip Dependency (Optional) */
// import 'popper.js';

/* Boostrap 4 Individual Components (Optional) */
// import 'bootstrap/js/src/alert';
// import 'bootstrap/js/src/button';
// import 'bootstrap/js/src/carousel';
// import 'bootstrap/js/src/collapse';
// import 'bootstrap/js/src/dropdown';
// import 'bootstrap/js/src/modal';
// import 'bootstrap/js/src/popover';
// import 'bootstrap/js/src/scrollspy';
// import 'bootstrap/js/src/tab';
// import 'bootstrap/js/src/tooltip'; /* requires popper.js */
// import 'bootstrap/js/src/util';

if (process.env.NODE_ENV === 'development') {
  require('../index.html'); /* Require so webpack watches changes to html file */
}
