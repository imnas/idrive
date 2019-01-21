const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorProfileSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  schedule: {
    type: Array,
    required: false
  },
  experience: [{
    from: {
      type: Date,
      required: true,
    },
    to: {
      type: Date,
      default: Date.now
    }
  }],
  profilePicture: {
    // Set to string temporarily - Change to file type
    type: String,
    required: true
  },
  biography: {
    type: String,
    required: false
  },
  qualifications: [{
    adi: {
      type: String,
      required: true
    },
    cpd: {
      type: String,
      required: false
    },
    transmissionTypes: [{
      manual: {
        type: Boolean,
        required: false
      },
      automatic: {
        type: Boolean,
        required: false
      }
    }]
  }]
});

module.exports = InstructorProfile = mongoose.model('instructorProfiles', instructorProfileSchema);