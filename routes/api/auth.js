const express = require('express');
const router = express.Router();
const Instructor = require('../../models/Instructor');
const Learner = require('../../models/Learner');
const bcrypt = require('bcrypt');

// @PATH    - POST /api/auth/register
// @ACCESS  - Public
// @DESC    - Register a new user
router.post('/register', (req, res) => {
  // Check what's the user type
  if(req.body.type === 'instructor') {
    // Check if the user exists
    Instructor.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        res.status(403).send('User already exists.');
      } else {
        // Then proceed with the registration form
        const newUser = new Instructor({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
          city: req.body.city,
          postalCode: req.body.postalCode
        });
        bcrypt.genSalt(10, (err, salt) => {
          if(err) {
            throw err;
          } else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) {
                throw err;
              } else {
                newUser.password = hash;
                newUser.save();
                res.json(newUser);
              }
            })
          }
        })
      }
    })
  } else if(req.body.type === 'learner') {
    // Register a learner
    // Check for an existing user
    Learner.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        res.status(403).send('User already exists.');
      } else {
        // Then proceed with the registration form
        const newUser = new Learner({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
          city: req.body.city,
          postalCode: req.body.postalCode
        });
        bcrypt.genSalt(10, (err, salt) => {
          if(err) {
            throw err;
          } else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) {
                throw err;
              } else {
                newUser.password = hash;
                newUser.save();
                res.json(newUser);
              }
            })
          }
        })
      }
    })
  }
});

// @PATH    - POST /api/auth/login
// @ACCESS  - Public
// @DESC    - Log a user in
router.post('/login', (req, res) => {
  // Check for existing user
  // If there is one, check the password using bcrypt
  // If the password doesn't match, or the user doesn't exist, send an error code
});

module.exports = router;