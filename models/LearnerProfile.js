const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const learnerProfileSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  profilePicture: {
    // Set to string temporarily - Change to file type
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

module.exports = LearnerProfile = mongoose.model('learnerProfiles', learnerProfileSchema);