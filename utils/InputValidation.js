// Add validation functions to the exported object below.
const Validator = require('validator');

module.exports = {
  validateRegistrationForm(data) {
    let errors = {};
    if(Validator.isEmpty(data.firstName)) {
      errors.firstNameEmpty = 'First Name Field Is Required.';
    }
    if(Validator.isEmpty(data.lastName)) {
      errors.lastNameEmpty = 'Last Name Field Is Required.';
    }
    if(Validator.isEmpty(data.password)) {
      errors.passwordEmpty = 'Password Field Is Required.';
    }
    if(data.password !== data.confirmPassword) {
      errors.passwordNotMatching = 'Passwords Are Not Matching.';
    }
    if(!Validator.isLength(data.password, { min: 8, max: 32 })) {
      errors.passwordLength = 'Password Length Should Be Between 8 And 32 Characters.';
    }
    if(Validator.isEmpty(data.email)) {
      errors.emailEmpty = 'Email Field Is Required.';
    }
    if(!Validator.isEmail(data.email)) {
      errors.emailInvalid = 'Email Address Is Not Valid.';
    }
    if(Validator.isEmpty(data.phone)) {
      errors.phoneEmpty = 'Phone Field Is Required.';
    }
    if(Validator.isEmpty(data.city)) {
      errors.cityEmpty = 'City Name Field Is Required.';
    }
    if(Validator.isEmpty(data.postalCode)) {
      errors.postalCodeEmpty = 'Postal Code Field Is Required.';
    }
    if(Validator.isEmpty(data.address)) {
      errors.addressEmpty = 'Address Field Is Required.';
    }
    if(Reflect.ownKeys(errors).length >= 1) {
      return errors;
    } else {
      return true;
    }
  },
}