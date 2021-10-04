const { Schema } = require('mongoose');

const PlanetsSchema = new Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

module.exports = PlanetsSchema;
