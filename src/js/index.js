if (process.env.NODE_ENV === 'development') {
  require('../pages/index.html'); /* Require so webpack watches changes to html file */
}

import '../css/main.css';
