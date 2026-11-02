const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); menu.focus();
  }
});
document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('#interest').value = link.dataset.interest;
}));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#inquiry').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const fields = new FormData(form);
  const subject = `DEINDE inquiry: ${fields.get('interest')}`;
  const body = `Hello DEINDE,\n\n${fields.get('message')}\n\nName: ${fields.get('name')}\nEmail: ${fields.get('email')}\nOrganization: ${fields.get('organization') || 'Not provided'}\nInterest: ${fields.get('interest')}\n`;
  const status = document.querySelector('#form-status');
  document.querySelector('#inquiry-ready').hidden = false;
  status.textContent = 'Your draft is ready. Review it below, then open it in your email app to send. Nothing has been sent yet.';
  document.querySelector('#draft-text').value = `Subject: ${subject}\n\n${body}`;
  document.querySelector('#email-inquiry').href = `mailto:cjsmith410@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector('#copy-draft').addEventListener('click', async () => {
  const draft = document.querySelector('#draft-text');
  try { await navigator.clipboard.writeText(draft.value); document.querySelector('#form-status').textContent = 'Draft copied. Paste it into an email to cjsmith410@gmail.com.'; }
  catch { draft.focus(); draft.select(); document.querySelector('#form-status').textContent = 'Select and copy the draft below, then email it to cjsmith410@gmail.com.'; }
});
