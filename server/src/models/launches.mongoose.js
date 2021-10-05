const { Schema, model } = require('mongoose');

const LaunchesSchema = new Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  target: {
    type: String,
  },
  customers: {
    type: [String],
    default: ['Elon Musk', 'SpaceX'],
    required: true,
  },
  upcoming: {
    type: Boolean,
    default: true,
    required: true,
  },
  success: {
    type: Boolean,
    default: true,
    required: true,
  },
});

module.exports = model('Launch', LaunchesSchema);
