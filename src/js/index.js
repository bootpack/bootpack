import '../css/main.css';

if (process.env.NODE_ENV === 'development') {
  require('../index.html'); /* Require so webpack watches changes to html file */
}
