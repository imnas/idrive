const express = require("express");
const router = express.Router();
const Instructor = require("../../models/Instructor");
const InstructorProfile = require("../../models/InstructorProfile");

// @PATH    - GET /api/results/:postalCode
// @ACCESS  - Private
// @DESC    - Get instructors within the zip code area
// @TODO:   - Add more data to the response
router.get(
  "/:postalCode",
  (req, res) => {
    let result = [];
    Instructor.find({
      postalCode: req.params.postalCode
    }).then(instructors => {
      if (instructors.length > 0) {
        instructors.map(instructor => {
          let newInstructorResult = {};
          newInstructorResult.id = instructor.id;
          newInstructorResult.name = `${instructor.firstName} ${instructor.lastName}`;
          result.push(newInstructorResult);
        });
        result.map((instructor, index) => {
          InstructorProfile.findOne({ user: instructor.id }).then(profile => {
            if (profile) {
              result[index].gender = profile.gender,
              result[index].profilePicture = profile.profilePicture,
              result[index].rate = profile.rate,
              result[index].carMake = profile.cars[0].make,
              result[index].carModel = profile.cars[0].model,
              result[index].carFuel = profile.cars[0].fuel,
              result[index].carGearbox = profile.cars[0].gearbox,
              result[index].carImage = profile.cars[0].image
            }
            if (index == result.length - 1) {
              setTimeout(() => {
                res.status(200).json(result);
              }, 500);
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
