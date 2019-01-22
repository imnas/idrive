const express = require("express");
const router = express.Router();
const passport = require("passport");
const Instructor = require("../../models/Instructor");
const InstructorProfile = require("../../models/InstructorProfile");

// @PATH    - GET /api/results/:postalCode
// @ACCESS  - Private
// @DESC    - Get instructors within the zip code area
// @TODO:   - Add more data to the response
router.get(
  "/:postalCode",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    let result = [];
    Instructor.find({
      postalCode: req.params.postalCode
    }).then(instructors => {
      if (instructors) {
        instructors.map((instructor, index) => {
          let newInstructorResult = {};
          newInstructorResult.id = instructor.id;
          newInstructorResult.name = `${instructor.firstName} ${
            instructor.lastName
          }`;
          result.push(newInstructorResult);
        });
        result.map((instructor, index) => {
          InstructorProfile.findOne({ user: instructor.id }).then(profile => {
            if (profile) {
              (result[index].gender = profile.gender),
                (result[index].carImage = profile.cars[0].image);
              if (index === 2) {
                setTimeout(() => {
                  res.json(result);
                }, 500);
              }
            }
          });
        });
      } else {
        res.status(404).send("No instructors found in your area.");
      }
    });
  }
);

module.exports = router;
