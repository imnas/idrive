const express = require('express');
const router = express.Router();
const InstructorProfile = require('../../models/InstructorProfile');
const LearnerProfile = require('../../models/LearnerProfile');

// @PATH    - GET /api/profile/all
// @ACCESS  - Private
// @DESC    - Get current users profile
router.get('/current', (req, res) => {
  res.send('Hello, World');
});

module.exports = router;