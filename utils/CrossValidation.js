const Instructor = require('../models/Instructor');
const Learner = require('../models/Learner');

class CrossValidation {
    constructor() {
        this.results = {
            instructorResult: undefined,
            learnerResult: undefined,
            finalResult: undefined
        };
        this.types = {
            instructorResult: undefined,
            learnerResult: undefined,
            finalResult: undefined
        };
        this.checkInstructor = this.checkInstructor.bind(this);
        this.checkLearner = this.checkLearner.bind(this);
        this.crossCheck = this.crossCheck.bind(this);
        this.typeCheck = this.typeCheck.bind(this);
    };
    // Check for existing user with the email provided from the client
    checkInstructor(data) {
        Instructor.findOne({
                email: data.email
            })
            .then(user => {
                if (user) {
                    this.results.instructorResult = true;
                    this.types.instructorResult = true;
                } else {
                    this.results.instructorResult = false;
                    this.types.instructorResult = false;
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
                    this.types.learnerResult = true;
                } else {
                    this.results.learnerResult = false;
                    this.types.learnerResult = false;
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
    // Check user type
    typeCheck(data) {
        this.checkInstructor(data);
        this.checkLearner(data);
        setTimeout(() => {
            if (this.types.instructorResult && !this.types.learnerResult) {
                this.types.finalResult = 'instructor';
            } else if (this.types.learnerResult && !this.types.instructorResult) {
                this.types.finalResult = 'learner';
            } else {
                this.types.finalResult = false;
            }
        }, 500);
    }
};

const crossValidator = new CrossValidation();

module.exports = crossValidator;