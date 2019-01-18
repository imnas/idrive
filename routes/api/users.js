const express = require('express');
const router = express.Router();
const Instructor = require('../../models/Instructor');
const InstructorProfile = require('../../models/InstructorProfile');
const Learner = require('../../models/Learner');
const LearnerProfile = require('../../models/LearnerProfile');
const passport = require('passport');

// @PATH    - GET /api/:type/:id
// @ACCESS  - Private
// @DESC    - Get user by ID
router.get('/:type/:id', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    if (req.params.type === 'instructor') {
        Instructor.findById(req.params.id)
            .then(user => {
                if (user) {
                    const instructor = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone,
                        city: user.city,
                        postalCode: user.postalCode,
                        address: user.address
                    };
                    return res.status(200).json(instructor);
                } else {
                    return res.status(404).send('Instructor not found.');
                }
            })
    } else if (req.params.type = 'learner') {
        Learner.findById(req.params.id)
            .then(user => {
                if (user) {
                    const learner = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone,
                        city: user.city,
                        postalCode: user.postalCode,
                        address: user.address
                    };
                    return res.status(200).json(learner);
                } else {
                    return res.status(404).send('Learner not found.');
                }
            })
    }
});

// @PATH    - GET /api/:type/:id/current
// @ACCESS  - Private
// @DESC    - Get user by ID
router.get('/:type/:id/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    if (req.params.type === 'instructor') {
        InstructorProfile.findById(req.params.id)
            .then(profile => {
                if (profile) {
                    const instructor = {
                        profilePicture: profile.profilePicture,
                        biography: profile.biography,
                        experience: profile.experience
                    };
                    return res.status(200).json(instructor);
                } else {
                    return res.status(404).send('Profile not found.');
                }
            })
    } else if (req.params.type = 'learner') {
        LearnerProfile.findById(req.params.id)
            .then(profile => {
                if (profile) {
                    const learner = {
                        profilePicture: profile.profilePicture
                    };
                    return res.status(200).json(learner);
                } else {
                    return res.status(404).send('Profile not found.');
                }
            })
    }
});

module.exports = router;