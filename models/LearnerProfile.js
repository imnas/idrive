const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const learnerProfileSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  }
});

module.exports = LearnerProfile = mongoose.model('learnerProfiles', learnerProfileSchema);