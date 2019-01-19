// Add validation functions to the exported object below.
const Validator = require('validator');

module.exports = {
  validateRegistrationForm(data) {
    let errors = {};
    if (Validator.isEmpty(data.firstName)) {
      errors.firstNameEmpty = 'First Name field is required.';
    }
    if (Validator.isEmpty(data.lastName)) {
      errors.lastNameEmpty = 'Last Name field is required.';
    }
    if (Validator.isEmpty(data.password)) {
      errors.passwordEmpty = 'Password field is required.';
    }
    if (data.password !== data.confirmPassword) {
      errors.passwordNotMatching = 'Passwords are Not Matching.';
    }
    if (!Validator.isLength(data.password, {
        min: 8,
        max: 32
      })) {
      errors.passwordLength = 'Your password should be between 8 and 32 characters long.';
    }
    if (Validator.isEmpty(data.email)) {
      errors.emailEmpty = 'Email field is required.';
    }
    if (!Validator.isEmail(data.email)) {
      errors.emailInvalid = 'Email address is not valid.';
    }
    if (Validator.isEmpty(data.phone)) {
      errors.phoneEmpty = 'Phone field is required.';
    }
    if (Validator.isEmpty(data.city)) {
      errors.cityEmpty = 'City Name field is required.';
    }
    if (Validator.isEmpty(data.postalCode)) {
      errors.postalCodeEmpty = 'Postal Code field is required.';
    }
    if (Validator.isEmpty(data.address)) {
      errors.addressEmpty = 'Address field is required.';
    }
    if (Reflect.ownKeys(errors).length > 0) {
      return errors;
    } else {
      return true;
    }
  },
  validateLoginForm(data) {
    let errors = {};
    if (Validator.isEmpty(data.email)) {
      errors.emailEmpty = 'Email field is required.';
    }
    if (!Validator.isEmail(data.email)) {
      errors.emailInvalid = 'Email Address is not valid.';
    }
    if (Validator.isEmpty(data.password)) {
      errors.passwordEmpty = 'Password field is required.';
    }
    if (Reflect.ownKeys(errors).length > 0) {
      return errors;
    } else {
      return true;
    }
  }
}