const express = require('express');
const router = express.Router();
const Instructor = require('../../models/Instructor');
const InstructorProfile = require('../../models/InstructorProfile');
const Learner = require('../../models/Learner');
const LearnerProfile = require('../../models/LearnerProfile');
const passport = require('passport');

// @PATH    - GET /api/users/:handle
// @ACCESS  - Private
// @DESC    - Get user by the handle
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
// @DESC    - Get user profile by the handle
router.get('/:handle/profile', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    InstructorProfile.findOne({
            handle: req.params.handle
        })
        .then(profile => {
            if (profile) {
                const instructor = {
                    gender: profile.gender,
                    profilePicture: profile.profilePicture,
                    experience: {
                        from: profile.from
                    },
                    biography: profile.biography,
                    qualifications: {
                        adi: profile.adi,
                        cpd: profile.cpd,
                        transmissionTypes: {
                        manual: profile.manual,
                        automatic: profile.automatic
                        }
                    },
                    cars: {
                        make: profile.make,
                        model: profile.model,
                        year: profile.year,
                        registration: profile.registration,
                        gearbox: profile.gearbox,
                        image: profile.image,
                        fuel: profile.fuel
                    },
                    rate: profile.rate
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