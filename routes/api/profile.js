const express = require("express");
const router = express.Router();
const passport = require("passport");
const InstructorProfile = require("../../models/InstructorProfile");
const LearnerProfile = require("../../models/LearnerProfile");
const crossValidator = require("../../utils/CrossValidation");

// @PATH    - GET /api/profile/current
// @ACCESS  - Private
// @DESC    - Get current users profile
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // Check user type
    crossValidator.typeCheck(req.user);
    setTimeout(() => {
      const {
        finalResult
      } = crossValidator.types;
      if (finalResult === "instructor") {
        InstructorProfile.findOne({
            user: req.user.id
          })
          .then(profile => {
            if (!profile) {
              res
                .status(404)
                .send(
                  `${req.user.firstName} ${
                    req.user.lastName
                  } does not have a profile.`
                );
            } else {
              res.status(200).json(profile);
            }
          })
          .catch(err => console.log(err));
      } else if (finalResult === "learner") {
        LearnerProfile.findOne({
          user: req.user.id
        }).then(profile => {
          if (!profile) {
            res
              .status(404)
              .send(
                `${req.user.firstName} ${
                  req.user.lastName
                } does not have a profile.`
              );
          } else {
            res.status(200).json(profile);
          }
        });
      }
    }, 1000);
  }
);

// @PATH    - POST /api/profile/add
// @ACCESS  - Private
// @DESC    - Add a new profile
router.post(
  "/add",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // Check user type
    crossValidator.typeCheck(req.user);
    setTimeout(() => {
      const {
        finalResult
      } = crossValidator.types;
      if (finalResult === "instructor") {
        // Check if a profile exists
        InstructorProfile.findOne({
          user: req.user.id
        }).then(profile => {
          if (!profile) {
            const newProfile = new InstructorProfile({
              user: req.user.id,
              gender: req.body.gender,
              schedule: [],
              profilePicture: req.body.profilePicture,
              experience: {
                from: req.body.from
              },
              biography: req.body.biography,
              qualifications: {
                adi: req.body.adi,
                cpd: req.body.cpd,
                transmissionTypes: {
                  manual: req.body.manual,
                  automatic: req.body.automatic
                }
              },
              cars: {
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                registration: req.body.registration,
                gearbox: req.body.gearbox,
                image: req.body.image
              }
            });
            newProfile.save();
            res.status(200).json(newProfile);
          } else {
            res.status(401).send("You already have a profile.");
          }
        });
      } else if (finalResult === "learner") {
        // Check if a profile exists
        LearnerProfile.findOne({
          user: req.user.id
        }).then(profile => {
          if (!profile) {
            const newProfile = new LearnerProfile({
              gender: req.body.gender,
              profilePicture: req.body.profilePicture
            });
            newProfile.save();
            res.status(200).json(newProfile);
          } else {
            res.status(401).send("You already have a profile.");
          }
        });
      }
    }, 1000);
  }
);

// @PATH    - GET /api/profile/schedule
// @ACCESS  - Private
// @DESC    - Get instructor schedule
router.get(
  "/schedule",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // Check user type
    crossValidator.typeCheck(req.user);
    setTimeout(() => {
      const {
        finalResult
      } = crossValidator.types;
      if (finalResult === "instructor") {
        InstructorProfile.findOne({
          user: req.user.id
        }).then(profile => {
          if (!profile) {
            return res.status(404).send("Profile not found.");
          } else {
            return res.status(200).json(profile.schedule);
          }
        });
      }
    }, 1000);
  }
);

// @PATH    - PUT /api/profile/schedule
// @ACCESS  - Private
// @DESC    - Push reminders to instructors schedules
router.put(
  "/schedule",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    // Check user type
    crossValidator.typeCheck(req.user);
    setTimeout(() => {
      const {
        finalResult
      } = crossValidator.types;
      if (finalResult === "instructor") {
        InstructorProfile.findOne({
          user: req.user.id
        }).then(profile => {
          if (!profile) {
            res.status(404).send("Profile not found.");
          } else {
            const newReminder = {
              time: req.body.time,
              note: req.body.note
            };
            profile.schedule.push(newReminder);
            profile.save();
            res.json(profile);
          }
        });
      } else {
        res.status(401).send("Unauthorized.");
      }
    }, 1000);
  }
);

// @PATH    - DELETE /api/profile/schedule
// @ACCESS  - Private
// @DESC    - Delete reminders
router.delete(
  "/schedule/:index",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      finalResult
    } = crossValidator.types;
    if (finalResult === "instructor") {
      InstructorProfile.findOne({
        user: req.user.id
      }).then(profile => {
        if (!profile) {
          res.status(404).send("Profile not found.");
        } else {
          profile.schedule.splice(req.params.index, 1);
          profile.save();
          res.json(profile);
        }
      });
    } else {
      res.status(401).send("Unauthorized.");
    }
  }
);

// @PATH    - POST /api/profile/:id/cars/add
// @ACCESS  - Private
// @DESC    - Add a car
router.post('/:id/cars/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  InstructorProfile.findOne({ user: req.params.id })
      .then(profile => {
        if (profile) {
          const newCar = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            registration: req.body.registration,
            gearbox: req.body.registration,
            image: req.body.image
          };
          profile.cars.push(newCar);
          profile.save();
          res.status(200).json(profile);
        }
      })
});

// @PATH    - PUT /api/profile/:id/cars/edit
// @ACCESS  - Private
// @DESC    - Edit a car
router.put('/:id/cars/:index/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  InstructorProfile.findOne({ user: req.params.id })
      .then(profile => {
        if (profile) {
          const editedCar = {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            registration: req.body.registration,
            gearbox: req.body.registration,
            image: req.body.image
          };
          profile.cars[req.params.index] = editedCar;
          profile.save();
          res.status(200).json(profile);
        }
      })
});

// @PATH    - DELETE /api/profile/:id/cars/:id/delete
// @ACCESS  - Private
// @DESC    - Delete a car
router.delete('/:id/cars/:index/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
  InstructorProfile.findOne({ user: req.params.id })
      .then(profile => {
        if (profile) {
          profile.cars.splice(req.params.index, 1);
          profile.save();
          res.status(200).json(profile);
        }
      })
});

module.exports = router;