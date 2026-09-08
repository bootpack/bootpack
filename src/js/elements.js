import '../scss/elements.scss';
import 'bootstrap/js/dist/alert';
import 'bootstrap/js/dist/button';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap/js/dist/tab';
import Popover from 'bootstrap/js/dist/popover';
import ScrollSpy from 'bootstrap/js/dist/scrollspy';
import Toast from 'bootstrap/js/dist/toast';
import Tooltip from 'bootstrap/js/dist/tooltip';

for (const element of document.querySelectorAll('[data-bs-toggle="tooltip"]')) {
  new Tooltip(element);
}
for (const element of document.querySelectorAll('[data-bs-toggle="popover"]')) {
  new Popover(element);
}
for (const element of document.querySelectorAll('[data-elements-scroll]')) {
  new ScrollSpy(element, { target: '#scrollspy-nav', rootMargin: '0px 0px -25%' });
}
const toast = new Toast(document.querySelector('#elements-toast'), { autohide: false });
document.querySelector('[data-show-toast]').addEventListener('click', () => toast.show());

const form = document.querySelector('[data-elements-form]');
form.addEventListener('submit', event => {
  event.preventDefault();
  form.classList.add('was-validated');
  form.querySelector('[role="status"]').textContent = form.checkValidity() ? 'Preferences previewed. Nothing was sent or stored.' : '';
});
form.addEventListener('reset', () => {
  form.classList.remove('was-validated');
  form.querySelector('[role="status"]').textContent = '';
});
form.querySelector('[type="submit"]').disabled = false;

for (const button of document.querySelectorAll('[data-project-page]')) {
  button.addEventListener('click', () => {
    for (const body of document.querySelectorAll('[data-table-page]')) {
      body.hidden = body.dataset.tablePage !== button.dataset.projectPage;
    }
    for (const link of document.querySelectorAll('[data-project-page]')) {
      const active = link === button;
      link.parentElement.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
  });
}