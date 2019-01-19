const Instructor = require('../models/Instructor');
const Learner = require('../models/Learner');

class CrossValidation {
    constructor() {
        this.results = {
            instructorResult: undefined,
            learnerResult: undefined,
            finalResult: undefined
        };
        this.checkInstructor = this.checkInstructor.bind(this);
        this.checkLearner = this.checkLearner.bind(this);
        this.crossCheck = this.crossCheck.bind(this);
    };
    checkInstructor(data) {
        Instructor.findOne({
                email: data.email
            })
            .then(user => {
                if (user) {
                    this.results.instructorResult = true;
                } else {
                    this.results.instructorResult = false;
                }
            })
            .catch(err => console.log(err));
    };
    checkLearner(data) {
        Learner.findOne({
                email: data.email
            })
            .then(user => {
                if (user) {
                    this.results.learnerResult = true;
                } else {
                    this.results.learnerResult = false;
                }
            })
            .catch(err => console.log(err));
    };
    crossCheck(data) {
        this.checkInstructor(data);
        this.checkLearner(data);
        setTimeout(() => {
            if (this.results.instructorResult || this.results.learnerResult) {
                this.results.finalResult = true;
            } else {
                this.results.finalResult = false;
            }
        }, 500);
    };
};

const crossValidator = new CrossValidation();

module.exports = crossValidator;