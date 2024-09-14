// To add real-time validation to your form as users leave each field, you can use JavaScript event listeners to handle the blur event for each input field. The blur event is triggered when an input field loses focus, which is the ideal time to validate its value.

function createButton(id, text, type = "button") {
  const button = document.createElement("button");
  button.id = id;
  button.classList.add("btn");
  button.textContent = text;
  button.type = type; // Set the button type (default is 'button')
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

function createFormElement(type, attributes = {}, options = []) {
  const element = document.createElement(type);

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

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

function showErrorMessage(input, message) {
  let error = document.querySelector(`#${input.id}-error`);
  if (!error) {
    error = document.createElement("div");
    error.id = `${input.id}-error`;
    error.classList.add("error");
    input.parentNode.insertBefore(error, input.nextSibling);
  }
  error.textContent = message;
}

function clearErrorMessage(input) {
  const error = document.querySelector(`#${input.id}-error`);
  if (error) {
    error.remove();
  }
}

function validateEmail(emailField) {
  const value = emailField.value;
  if (!value) {
    showErrorMessage(emailField, "Email is required.");
  } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
    showErrorMessage(emailField, "Invalid email address.");
  } else {
    clearErrorMessage(emailField);
  }
}

function validateCountry(countryField) {
  const value = countryField.value;
  if (!value) {
    showErrorMessage(countryField, "Country is required.");
  } else {
    clearErrorMessage(countryField);
  }
}

function validateZip(zipField) {
  const value = zipField.value;
  if (!value) {
    showErrorMessage(zipField, "Zip code is required.");
  } else if (!/^\d{5}(-\d{4})?$/.test(value)) {
    showErrorMessage(zipField, "Invalid zip code.");
  } else {
    clearErrorMessage(zipField);
  }
}

function validatePassword(passwordField) {
  const value = passwordField.value;
  if (!value) {
    showErrorMessage(passwordField, "Password is required.");
  } else {
    clearErrorMessage(passwordField);
  }
}

function validatePasswordConfirm(passwordConfirmField, passwordField) {
  const value = passwordConfirmField.value;
  if (!value) {
    showErrorMessage(
      passwordConfirmField,
      "Password confirmation is required."
    );
  } else if (value !== passwordField.value) {
    showErrorMessage(passwordConfirmField, "Passwords do not match.");
  } else {
    clearErrorMessage(passwordConfirmField);
  }
}

export function createForm() {
  // Create form fields with labels
  const emailField = createFormElement("input", {
    type: "email",
    id: "email",
    placeholder: "Enter your email",
  });
  const emailLabel = createTextElement("label", "emailLabel", "Email:");
  emailLabel.setAttribute("for", "email");

  const countryField = createFormElement("select", { id: "country" }, [
    { value: "us", text: "United States" },
    { value: "ca", text: "Canada" },
    { value: "uk", text: "United Kingdom" },
  ]);
  const countryLabel = createTextElement("label", "countryLabel", "Country:");
  countryLabel.setAttribute("for", "country");

  const zipField = createFormElement("input", {
    type: "text",
    id: "zip",
    placeholder: "Enter your zip code",
  });
  const zipLabel = createTextElement("label", "zipLabel", "Zip Code:");
  zipLabel.setAttribute("for", "zip");

  const passwordField = createFormElement("input", {
    type: "password",
    id: "password",
    placeholder: "Enter your password",
  });
  const passwordLabel = createTextElement(
    "label",
    "passwordLabel",
    "Password:"
  );
  passwordLabel.setAttribute("for", "password");

  const passwordConfirmField = createFormElement("input", {
    type: "password",
    id: "passwordConfirm",
    placeholder: "Confirm your password",
  });
  const passwordConfirmLabel = createTextElement(
    "label",
    "passwordConfirmLabel",
    "Confirm Password:"
  );
  passwordConfirmLabel.setAttribute("for", "passwordConfirm");

  // Create a submit button
  const submitButton = createButton("submit", "Submit", "submit");

  // Create form element with novalidate attribute
  const form = createFormElement("form", { novalidate: true }); // Add novalidate attribute here

  // Append elements to form
  form.append(
    emailLabel,
    emailField,
    document.createElement("br"),
    countryLabel,
    countryField,
    document.createElement("br"),
    zipLabel,
    zipField,
    document.createElement("br"),
    passwordLabel,
    passwordField,
    document.createElement("br"),
    passwordConfirmLabel,
    passwordConfirmField,
    document.createElement("br"),
    submitButton
  );

  // Attach event listeners for validation
  emailField.addEventListener("blur", () => validateEmail(emailField));
  countryField.addEventListener("blur", () => validateCountry(countryField));
  zipField.addEventListener("blur", () => validateZip(zipField));
  passwordField.addEventListener("blur", () => validatePassword(passwordField));
  passwordConfirmField.addEventListener("blur", () =>
    validatePasswordConfirm(passwordConfirmField, passwordField)
  );

  // Handle form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Validate all fields
    validateEmail(emailField);
    validateCountry(countryField);
    validateZip(zipField);
    validatePassword(passwordField);
    validatePasswordConfirm(passwordConfirmField, passwordField);

    // Check if there are any error messages
    const errors = document.querySelectorAll(".error");
    if (errors.length === 0) {
      // Show success message
      const messageContent = document.querySelector("#message-content");
      messageContent.textContent = "Good job!";
      messageContent.style.color = "#28a745"; // Optional: Set text color to green
    }
  });

  // Append the form to the formContent container
  const formContent = document.querySelector("#form-content");
  formContent.appendChild(form); // Append the form element

  // Ensure the message-content div exists
  const messageContent = document.querySelector("#message-content");
  if (!messageContent) {
    const newMessageContent = document.querySelector("#message-content");
    newMessageContent.id = "message-content";
    formContent.appendChild(newMessageContent);
  }
}
