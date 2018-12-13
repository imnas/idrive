const express = require('express');
const router = express.Router();
const passport = require('passport');
const InstructorProfile = require('../../models/InstructorProfile');
const LearnerProfile = require('../../models/LearnerProfile');

// @PATH    - GET /api/profile/all
// @ACCESS  - Private
// @DESC    - Get current users profile
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Check user type
  if (req.body.type === 'instructor') {
    InstructorProfile.findOne({ user: req.body.id })
    .then(profile => {
      if(!profile) {
        res.status(404).send('Profile not found.');
      } else {
        res.status(200).json(profile);
      }
    })
  } else if (req.body.type === 'learner') {
    LearnerProfile.findOne({ user: req.body.id })
    .then(profile => {
      if(!profile) {
        res.status(404).send('Profile not found.');
      } else {
        res.status(200).json(profile);
      }
    })
  }
});

// @PATH    - POST /api/profile/add
// @ACCESS  - Private
// @DESC    - Add a new profile
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Check user type
  if (req.body.type === 'instructor') {
    // Check if a profile exists
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        const newProfile = new InstructorProfile({
          // Add experience and similar meta data
          user: req.body.user,
          proof: req.body.proof,
          profilePicture: req.body.profilePicture
        });
        newProfile.save();
        res.status(200).json(newProfile);
      } else {
        res.status(401).send('You already have a profile.');
      }
    })
  } else if (req.body.type === 'learner') {
    // Check if a profile exists
    Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        const newProfile = new LearnerProfile({
          profilePicture: req.body.profilePicture
        });
        newProfile.save();
        res.status(200).json(newProfile);
      } else {
        res.status(401).send('You already have a profile.');
      }
    })
  }
});

// @PATH    - PUT /api/profile/edit
// @ACCESS  - Private
// @DESC    - Edit a profile
router.put('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Check user type
  if (req.body.type === 'instructor') {
    InstructorProfile.findOneAndUpdate({ user: req.body.id })
    .then(profile => {
      if(profile) {
        // Edit the profile here
      } else {
        res.status(404).send('Profile not found.');
      };
    });
  } else if (req.body.type === 'learner') {
    LearnerProfile.findOneAndUpdate({ user: req.body.id })
    .then(profile => {
      if(profile) {
        // Edit the profile here
      } else {
        res.status(404).send('Profile not found.');
      };
    });
  }
})

module.exports = router;