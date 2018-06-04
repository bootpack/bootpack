import '../css/main.css';

/* Boostrap 4 Full Bundles */
import 'bootstrap/dist/js/bootstrap.bundle'; /* Includes popper.js */
// import 'bootstrap'; /* Does not include popper. js */

/* Bootstrap 4 Tooltip Dependency (Optional) */
// import 'popper.js';

/* Boostrap 4 Individual Components (Optional) */
// import 'bootstrap/js/dist/alert';
// import 'bootstrap/js/dist/button';
// import 'bootstrap/js/dist/carousel';
// import 'bootstrap/js/dist/collapse';
// import 'bootstrap/js/dist/dropdown';
// import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/popover';
// import 'bootstrap/js/dist/scrollspy';
// import 'bootstrap/js/dist/tab';
// import 'bootstrap/js/dist/tooltip'; /* requires popper.js */
// import 'bootstrap/js/dist/util';

if (process.env.NODE_ENV === 'development') {
  require('../index.html'); /* Require so webpack watches changes to html file */
}
