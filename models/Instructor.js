const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  firstName: {
    type: string,
    required: true
  },
  lastName: {
    type: string,
    required: true
  },
  email: {
    type: string,
    required: true
  },
  phone: {
    type: string,
    required: true
  },
  password: {
    type: string,
    required: true
  },
  city: {
    type: string,
    required: true
  },
  postalCode: {
    type: number,
    required: true
  }
  // Add ratings and other meta functionality.
});

module.exports = Instructor = mongoose.model('instructorSchema', instructorSchema);