const express = require("express");
const router = express.Router();
const Instructor = require("../../models/Instructor");
const Learner = require("../../models/Learner");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const passport = require("passport");
const InputValidation = require("../../utils/InputValidation");
const crossValidator = require("../../utils/CrossValidation");
const fetch = require('node-fetch');

const getLocation = async (postalCode) => {
  const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${postalCode.replace(" ", "")}.json?access_token=${config.mapbox.token}`);
  const data = await res.json();
  return data.features[0].center;
};

// @PATH    - POST /api/auth/register
// @ACCESS  - Public
// @DESC    - Register a new user
router.post("/register", (req, res) => {
  // Check if an user is registered with the same email address within either the instructor or learner table
  crossValidator.crossCheck(req.body);
  setTimeout(() => {
    const { finalResult } = crossValidator.results;
    if (finalResult) {
      return res.status(403).send("Email address is already in use.");
    } else {
      // Create a random 4 digit number for the handle to avoid different users having the same handle
      const handleNumber = `${Math.floor(Math.random() * 10)}${Math.floor(
        Math.random() * 10
      )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
      // Check user type
      if (req.body.type === "instructor") {
        // Check if the user input is valid
        const isValid = InputValidation.validateRegistrationForm(req.body);
        // Then proceed with the registration form
        if (isValid === true) {
          const newUser = new Instructor({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            handle: `${req.body.firstName
              .replace(" ", "")
              .toLowerCase()}-${req.body.lastName
              .replace(" ", "")
              .toLowerCase()}-${handleNumber}`,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            city: req.body.city,
            postalCode: `${req.body.postalCode.replace(" ", "")}`,
            address: req.body.address,
            geolocation: []
          });
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              throw err;
            } else {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                  throw err;
                } else {
                  newUser.password = hash;
                }
              });
            }
          });
          getLocation(req.body.postalCode)
          .then(data => {
            newUser.geolocation = data;
            newUser.save();
            res.json(newUser);
          })
          .catch(err => console.log(err));
        } else {
          res.status(400).json(isValid);
        }
        // Register a learner
      } else if (req.body.type === "learner") {
        // Check if the user input is valid
        const isValid = InputValidation.validateRegistrationForm(req.body);
        if (isValid === true) {
          // Then proceed with the registration form
          const newUser = new Learner({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            handle: `${req.body.firstName
              .replace(" ", "")
              .toLowerCase()}-${req.body.lastName
              .replace(" ", "")
              .toLowerCase()}-${handleNumber}`,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            city: req.body.city,
            postalCode: `${req.body.postalCode.replace(" ", "")}`,
            address: req.body.address,
            geolocation: []
          });
          bcrypt.genSalt(10, (err, salt) => {
            if (err) {
              throw err;
            } else {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                  throw err;
                } else {
                  newUser.password = hash;
                }
              });
            }
          });
          getLocation(req.body.postalCode)
          .then(data => {
            newUser.geolocation = data;
            newUser.save();
            res.json(newUser);
          })
          .catch(err => console.log(err));
        } else {
          res.status(400).json(isValid);
        }
      }
    }
  }, 1000);
});

// @PATH    - POST /api/auth/login
// @ACCESS  - Public
// @DESC    - Log a user in
router.post("/login", (req, res) => {
  // Check for user type
  crossValidator.typeCheck(req.body);
  setTimeout(() => {
    const { finalResult } = crossValidator.types;
    // Log in an instructor
    if (finalResult === "instructor") {
      // Check if the user exists
      Instructor.findOne({
        email: req.body.email
      }).then(user => {
        if (user) {
          // If there is one, check the password using bcrypt
          bcrypt.compare(req.body.password, user.password).then(match => {
            if (match) {
              // Sign a JWT token
              const payload = {
                type: "instructor",
                id: user.id,
                email: user.email,
                handle: user.handle
              };
              jwt.sign(
                payload,
                config.db.secretOrKey,
                {
                  expiresIn: 86400
                },
                (err, token) => {
                  if (err) {
                    throw err;
                  } else {
                    res.status(200).json({
                      success: true,
                      token: `Bearer ${token}`
                    });
                  }
                }
              );
            } else {
              // Send a 'Incorrect Password' message
              res
                .status(401)
                .json({ incorrectPassword: "Incorrect Password." });
            }
          });
        } else {
          res.status(404).json({ userDoesNotExist: "User does not exist." });
        }
      });
      // Log in a learner
    } else if (finalResult === "learner") {
      // Check if the user exists
      Learner.findOne({
        email: req.body.email
      }).then(user => {
        if (user) {
          // If there is one, check the password using bcrypt
          bcrypt.compare(req.body.password, user.password).then(match => {
            if (match) {
              // Sign a JWT token
              const payload = {
                type: "learner",
                id: user.id,
                email: user.email,
                handle: user.handle
              };
              jwt.sign(
                payload,
                config.db.secretOrKey,
                {
                  expiresIn: 86400
                },
                (err, token) => {
                  if (err) {
                    throw err;
                  } else {
                    res.status(200).json({
                      success: true,
                      token: `Bearer ${token}`
                    });
                  }
                }
              );
            } else {
              // Send an 'Incorrect Password' message
              res
                .status(401)
                .json({ incorrectPassword: "Incorrect Password." });
            }
          });
        } else {
          res.status(404).json({ userDoesNotExist: "User does not exist." });
        }
      });
    } else {
      res.status(404).json({ userDoesNotExist: "User does not exist." });
    }
  }, 1000);
});

// @PATH    - GET /api/auth/current
// @ACCESS  - Private
// @DESC    - Get user data
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const user = {
      id: req.user.id,
      handle: req.user.handle,
      email: req.user.email,
      firstName: user.firstName,
      lastName: req.user.lastName,
      phone: req.user.phone,
      city: req.user.city,
      postalCode: req.user.postalCode,
      address: req.user.address,
      created: req.user.created
    };
    res.status(200).json(user);
  }
);

module.exports = router;
