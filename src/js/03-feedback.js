import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const formData = { email: '', message: '' };

  // Function to save and log form data
  const saveAndLogData = () => {
    formData.email = emailInput.value;
    formData.message = messageInput.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    console.log('Form data:', formData);
  
  };
  const throttledSaveAndLogData = throttle(saveAndLogData, 500);

  // Load saved form data from localStorage
  const savedFormData = localStorage.getItem('feedback-form-state');
  if (savedFormData) {
    const parsedData = JSON.parse(savedFormData);
    emailInput.value = parsedData.email || '';
    messageInput.value = parsedData.message || '';
  }

  // Attach event listeners to form fields
  emailInput.addEventListener('input', throttledSaveAndLogData);
  messageInput.addEventListener('input', throttledSaveAndLogData);

  // Handle form submission
  form.addEventListener('submit', event => {
    event.preventDefault();
    console.log('Form submitted with data:', formData);

    // Clear form fields and localStorage
    emailInput.value = '';
    messageInput.value = '';
    localStorage.removeItem('feedback-form-state');
  });
});
