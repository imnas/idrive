const express = require('express');
const router = express.Router();
const passport = require('passport');
const InstructorProfile = require('../../models/InstructorProfile');
const LearnerProfile = require('../../models/LearnerProfile');

// @PATH    - GET /api/profile/current
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
    InstructorProfile.findOne({ user: req.user.id })
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
    LearnerProfile.findOne({ user: req.user.id })
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

// @PATH    - PUT /api/profile/experience
// @ACCESS  - Private
// @DESC    - Add experience to instructor profiles
router.put('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  if(req.body.type === 'instructor') {
    InstructorProfile.findOne({ user: req.body.id })
    .then(profile => {
      if(!profile) {
      res.status(404).send('Profile not found.');
      } else {
        const newExp = {
          from: req.body.from
        };
        profile.experience = (newExp);
        profile.save();
        res.json(profile);
      }
    })
  } else {
    res.status(401).send('Unauthorized.');
  }
});

// @PATH    - PUT /api/profile/schedule
// @ACCESS  - Private
// @DESC    - Push reminders to instructors schedules
router.put('/schedule', passport.authenticate('jwt', { session: false }), (req, res) => {
  if(req.body.type === 'instructor') {
    InstructorProfile.findOne({ user: req.body.id })
    .then(profile => {
      if(!profile) {
      res.status(404).send('Profile not found.');
      } else {
        const newReminder = {
          time: req.body.time,
          note: req.body.note
        };
        profile.schedule.push(newReminder)
        profile.save();
        res.json(profile);
      }
    })
  } else {
    res.status(401).send('Unauthorized.');
  }
});

// @PATH    - DELETE /api/profile/schedule
// @ACCESS  - Private
// @DESC    - Delete reminders
router.delete('/schedule', passport.authenticate('jwt', { session: false }), (req, res) => {
  if(req.body.type === 'instructor') {
    InstructorProfile.findOne({ user: req.body.id })
    .then(profile => {
      if(!profile) {
      res.status(404).send('Profile not found.');
      } else {
        const reminderIndex = req.body.reminderIndex;
        profile.schedule.splice(reminderIndex, 1);
        profile.save();
        res.json(profile);
      }
    })
  } else {
    res.status(401).send('Unauthorized.');
  }
});

module.exports = router;