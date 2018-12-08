const mongoose = requre('mongoose');
const Schema = mongoose.Schema;

const instructorProfileSchema = new Schema({
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
        type: Date || String,
        required: true
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