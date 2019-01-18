const Instructor = require('../models/Instructor');
const Learner = require('../models/Learner');

module.exports = {
    checkInstructor(data) {
        Instructor.findOne({
                email: data.email
            })
            .then(user => {
                if (user) {
                    return false;
                } else {
                    return true;
                }
            })
            .catch(err => console.log(err))
    },
    checkLearner(data) {
        Learner.findOne({
                email: data.email
            })
            .then(user => {
                if (user) {
                    return false;
                } else {
                    return true;
                }
            })
            .catch(err => console.log(err))
    },
    crossCheck(data) {
        const instructorResult = this.checkInstructor(data);
        const learnerResult = this.checkLearner(data);
        if (instructorResult === false || learnerResult === false) {
            return 'This email is already in use.';
        } else {
            return true;
        }
    }
};