import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  const saveAndLogFormData = () => {
    const formData = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    console.log('Form data:', formData);
  };

  const throttledSaveAndLogFormData = throttle(saveAndLogFormData, 500);

  emailInput.addEventListener('input', throttledSaveAndLogFormData);
  messageInput.addEventListener('input', throttledSaveAndLogFormData);

  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    console.log('Form submitted with data:', {
      email: emailInput.value,
      message: messageInput.value,
    });
    emailInput.value = '';
    messageInput.value = '';
    localStorage.removeItem('feedback-form-state');
  });
});
