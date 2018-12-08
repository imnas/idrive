// TODO: Implement validation and cross-checking different account types
const express = require('express');
const router = express.Router();
const Instructor = require('../../models/Instructor');
const Learner = require('../../models/Learner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const passport = require('passport');

// @PATH    - POST /api/auth/register
// @ACCESS  - Public
// @DESC    - Register a new user
router.post('/register', (req, res) => {
  // Check what's the user type
  if(req.body.type === 'instructor') {
    // Register an instructor
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
  // TEMPORARY SOLUTION: Check for user type
  if(req.body.type === 'instructor') {
    // Log in an instructor
    // Check if the user exists
    Instructor.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        // If there is one, check the password using bcrypt
        bcrypt.compare(req.body.password, user.password)
        .then(match => {
          if(match) {
            // Sign a JWT token
            const payload = {
              type: 'instructor',
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName
            }
            jwt.sign(payload, config.db.secretOrKey, { expiresIn: 99999 }, (err, token) => {
              if(err) {
                throw err;
              } else {
                res.status(200).json({ success: true, token: `Bearer ${token}` });
              }
            });
          } else {
            // Send a 'Incorrect Password' message
            res.status(401).send('Incorrect Password')
          }
        })
      } else {
        res.status(404).send('User does not exist.');
      }
    })
  } else if(req.body.type === 'learner') {
    // Log in a learner
    // Check if the user exists
    Learner.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        // If there is one, check the password using bcrypt
        bcrypt.compare(req.body.password, user.password)
        .then(match => {
          if(match) {
            // Sign a JWT token
            const payload = {
              type: 'learner',
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName
            }
            jwt.sign(payload, config.db.secretOrKey, { expiresIn: 99999 }, (err, token) => {
              if(err) {
                throw err;
              } else {
                res.status(200).json({ success: true, token: `Bearer ${token}` });
              }
            });
          } else {
            // Send a 'Incorrect Password' message
            res.status(401).send('Incorrect Password')
          }
        })
      } else {
        res.status(404).send('User does not exist.');
      }
    })
  }
});

// @PATH    - GET /api/auth/current
// @ACCESS  - Private
// @DESC    - Get user data
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const user = {
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName
  };
  res.status(200).json(user);
});

module.exports = router;