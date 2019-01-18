const Instructor = require('../models/Instructor');
const Learner = require('../models/Learner');

module.exports = (data) => {
    let errors = {};
    const { email } = data;
    Instructor.findOne({ email: email })
        .then(user => {
            if (user) {
                errors.instructorExists = 'This Email Address Has An Account Registered To It.';
            }
        })
        .catch(err => console.log(err));
    Learner.findOne({ email: email })
        .then(user => {
            if (user) {
                errors.learnerExists = 'This Email Address Has An Account Registered To It.';
            }
        })
        .catch(err => console.log(err));
    if (Reflect.ownKeys(errors).length >= 1) {
        return errors;
    } else {
        return true;
    }
};
