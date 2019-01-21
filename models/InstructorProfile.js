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
    type: String,
    required: false
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
  }],
  cars: [{
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    registration: {
      type: String,
      required: true
    },
    gearbox: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  }]
});

module.exports = InstructorProfile = mongoose.model('instructorProfiles', instructorProfileSchema);