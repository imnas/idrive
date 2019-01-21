const express = require('express');
const router = express.Router();
const passport = require('passport');
const Instructor = require('../../models/Instructor');
const InstructorProfile = require('../../models/InstructorProfile');

// @PATH    - GET /api/results/:postalCode
// @ACCESS  - Private
// @DESC    - Get instructors within the zip code area
// @TODO:   - Add more data to the response
router.get('/:postalCode', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let result = [];
    Instructor.find({
            postalCode: req.params.postalCode
        })
        .then(instructors => {
            if(instructors) {
                for (let i = 0; i < instructors.length; i++) {
                    let newInstructorResult = {
                        name: `${instructors[i].firstName} ${instructors[i].lastName}`
                    };
                    result.push(newInstructorResult);
                }
                res.json(result);
            } else {
                res.status(404).send('No instructors found in your area.');
            }
        })
});

module.exports = router;