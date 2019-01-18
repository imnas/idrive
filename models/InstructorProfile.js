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
      },
      to: {
        type: Date,
        default: Date.now
      }
    }
  ],
  proof: {
    // Set to string temporarily - Change to file type
    type: String,
    required: true
  },
  profilePicture: {
    // Set to string temporarily - Change to file type
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = InstructorProfile = mongoose.model('instructorProfiles', instructorProfileSchema);