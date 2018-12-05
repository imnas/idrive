const express = require('express');
const router = express.Router();

// @PATH    - POST /api/auth/register
// @ACCESS  - Public
// @DESC    - Register a new user
router.post('/register', (req, res) => {
  // Check if user wants to register as an instructor or a learner
  // Then proceed with the registration form
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