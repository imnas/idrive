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
    let newInstructorResult = {};
    Instructor.find({
            postalCode: req.params.postalCode
        })
        .then(instructors => {
            if (instructors) {
                instructors.map(instructor => {
                    newInstructorResult.name = `${instructor.firstName} ${instructor.lastName}`;
                    result.push(newInstructorResult);
                });
                res.json(result);
            } else {
                res.status(404).send('No instructors found in your area.');
            }
        })
});

module.exports = router;