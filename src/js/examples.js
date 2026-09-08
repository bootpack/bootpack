const billing = document.querySelector('[data-billing]');
if (billing) {
  billing.addEventListener('change', event => {
    const annual = event.target.value === 'annual';
    for (const price of document.querySelectorAll('[data-price]')) {
      price.textContent = `$${annual ? price.dataset.annual : price.dataset.monthly}`;
    }
    for (const period of document.querySelectorAll('[data-period]')) {
      period.textContent = annual ? '/ year' : '/ month';
    }
  });
}

const contact = document.querySelector('[data-contact-form]');
if (contact) {
  const status = contact.querySelector('[data-contact-status]');
  const plan = contact.querySelector('select');
  const requestedPlan = new URLSearchParams(location.search).get('plan');
  if (Array.from(plan.options).some(option => option.value === requestedPlan)) {
    plan.value = requestedPlan;
  }
  contact.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = 'Preview complete. No message was sent or stored.';
  });
  contact.addEventListener('reset', () => { status.textContent = ''; });
  contact.querySelector('[data-contact-submit]').disabled = false;
}

const albumDialog = document.querySelector('[data-album-dialog]');
if (albumDialog) {
  const fullImage = albumDialog.querySelector('[data-album-full]');
  for (const button of document.querySelectorAll('[data-album-image]')) {
    button.addEventListener('click', () => {
      const image = button.querySelector('img');
      fullImage.src = image.src;
      fullImage.alt = image.alt;
      albumDialog.showModal();
    });
  }
}