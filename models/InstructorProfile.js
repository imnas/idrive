const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorProfileSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  schedule: {
    type: Array,
    required: false
  },
  experience: [
    {
      from: {
        type: Date,
        required: true,
      }
    }
  ],
  proof: {
    // Set to string temporarily
    type: String,
    required: true
  },
  profilePicture: {
    // Set to string temporarily
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: false
  }
});

module.exports = InstructorProfile = mongoose.model('instructorProfiles', instructorProfileSchema);