const mongoose = requre('mongoose');
const Schema = mongoose.Schema;

const learnerProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'learners'
  },
  profilePicture: {
    // Set to string temporarily
    type: String,
    required: true
  }
});

module.exports = LearnerProfile = mongoose.model('learnerProfiles', learnerProfileSchema);