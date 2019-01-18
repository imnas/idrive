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
    InstructorProfile.findById(req.user.id)
      .then(profile => {
        if(!profile) {
          res.status(404).send('Profile not found.');
        } else {
          res.status(200).json(profile);
        }
      })
  } else if (req.body.type === 'learner') {
    LearnerProfile.findById(req.user.id)
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
    InstructorProfile.findById(req.user.id)
      .then(profile => {
        if(!profile) {
          const newProfile = new InstructorProfile({
            // Add experience and similar meta data
            user: req.body.user,
            proof: req.body.proof,
            profilePicture: req.body.profilePicture,
            experience: {
              from: req.body.from,
              to: req.body.to
            }
          });
          newProfile.save();
          res.status(200).json(newProfile);
        } else {
          res.status(401).send('You already have a profile.');
        }
      })
  } else if (req.body.type === 'learner') {
    // Check if a profile exists
    LearnerProfile.findById(req.user.id)
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
    InstructorProfile.findById(req.user.id)
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

// @PATH    - GET /api/profile/schedule
// @ACCESS  - Private
// @DESC    - Get instructor schedule
router.get('/schedule', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.body.type === 'instructor') {
    InstructorProfile.findById(req.user.id)
      .then(profile => {
        if (!profile) {
          return res.status(404).send('Profile not found.');
        } else {
          return res.status(200).json(profile.schedule);
        }
      })
  }
});

// @PATH    - PUT /api/profile/schedule
// @ACCESS  - Private
// @DESC    - Push reminders to instructors schedules
router.put('/schedule', passport.authenticate('jwt', { session: false }), (req, res) => {
  if(req.body.type === 'instructor') {
    InstructorProfile.findById(req.user.id)
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
router.delete('/schedule/:index', passport.authenticate('jwt', { session: false }), (req, res) => {
  if(req.body.type === 'instructor') {
    InstructorProfile.findById(req.user.id)
    .then(profile => {
      if(!profile) {
      res.status(404).send('Profile not found.');
      } else {
        profile.schedule.splice(req.params.index, 1);
        profile.save();
        res.json(profile);
      }
    })
  } else {
    res.status(401).send('Unauthorized.');
  }
});

module.exports = router;