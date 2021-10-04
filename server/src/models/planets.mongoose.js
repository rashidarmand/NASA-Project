const { Schema, model } = require('mongoose');

const PlanetsSchema = new Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

module.exports = model('Planet', PlanetsSchema);
