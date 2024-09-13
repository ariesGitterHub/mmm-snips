function createButton(id, text) {
  const button = document.createElement("button");
  button.id = id;
  button.classList.add("nav-btn");
  button.textContent = text;
  return button;
}

function createImageElement(id, src, alt = "") {
  const img = document.createElement("img");
  img.id = id;
  img.src = src;
  img.alt = alt;
  return img;
}

function createTextElement(tag, id, textContent) {
  const element = document.createElement(tag);
  element.id = id;
  element.textContent = textContent;
  return element;
}

/**
 * Creates a form element with specified attributes.
 * @param {string} type - The type of form element (e.g., 'input', 'textarea', 'select').
 * @param {object} attributes - An object containing the attributes to set on the form element.
 * @param {Array} options - An optional array of options for 'select' elements.
 * @returns {HTMLElement} The created form element.
 */
function createFormElement(type, attributes = {}, options = []) {
  // Create the element based on the type provided
  const element = document.createElement(type);

  // Set attributes for the element
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  // Special handling for 'select' elements to add options
  if (type === "select") {
    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      element.appendChild(optionElement);
    });
  }

  return element;
}

export function createForm() {
  
// Create form fields
const emailField = createFormElement('input', { type: 'email', id: 'email', placeholder: 'Enter your email' });
const countryField = createFormElement('select', { id: 'country' }, [
  { value: 'us', text: 'United States' },
  { value: 'ca', text: 'Canada' },
  { value: 'uk', text: 'United Kingdom' }
]);
const zipField = createFormElement('input', { type: 'text', id: 'zip', placeholder: 'Enter your zip code' });
const passwordField = createFormElement('input', { type: 'password', id: 'password', placeholder: 'Enter your password' });
const passwordConfirmField = createFormElement('input', { type: 'password', id: 'passwordConfirm', placeholder: 'Confirm your password' });

// Append fields to the form
const formContent = document.querySelector("#form-content");
formContent.appendChild(emailField);
formContent.appendChild(document.createElement('br')); // Line break
formContent.appendChild(countryField);
formContent.appendChild(document.createElement('br')); // Line break
formContent.appendChild(zipField);
formContent.appendChild(document.createElement('br')); // Line break
formContent.appendChild(passwordField);
formContent.appendChild(document.createElement('br')); // Line break
formContent.appendChild(passwordConfirmField);
formContent.appendChild(document.createElement('br')); // Line break

// Append the form to the body
document.body.appendChild(form);
}