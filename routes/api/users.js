const express = require('express');
const router = express.Router();
const Instructor = require('../../models/Instructor');
const InstructorProfile = require('../../models/InstructorProfile');
const Learner = require('../../models/Learner');
const LearnerProfile = require('../../models/LearnerProfile');
const passport = require('passport');

// @PATH    - GET /api/users/:handle
// @ACCESS  - Private
// @DESC    - Get user by ID
router.get('/:handle', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Instructor.findOne({
            handle: req.params.handle
        })
        .then(user => {
            if (user) {
                const instructor = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    city: user.city,
                    postalCode: user.postalCode,
                    address: user.address,
                    created: user.created
                };
                return res.status(200).json(instructor);
            } else {
                Learner.findOne({
                        handle: req.params.handle
                    })
                    .then(user => {
                        if (user) {
                            const learner = {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                phone: user.phone,
                                city: user.city,
                                postalCode: user.postalCode,
                                address: user.address,
                                created: user.created
                            };
                            return res.status(200).json(learner);
                        } else {
                            return res.status(404).send('User not found.');
                        }
                    })
            }
        })
});

// @PATH    - GET /api/users/:handle/profile
// @ACCESS  - Private
// @DESC    - Get user by ID
router.get('/:handle/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    InstructorProfile.findOne({
            handle: req.params.handle
        })
        .then(profile => {
            if (profile) {
                const instructor = {
                    profilePicture: profile.profilePicture,
                    biography: profile.biography,
                    experience: profile.experience
                };
                return res.status(200).json(instructor);
            } else {
                LearnerProfile.findOne({
                        handle: req.params.handle
                    })
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
        })
});

module.exports = router;