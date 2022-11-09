const { Schema, model } = require('mongoose');

const adventureSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Tech = model('Adventure', adventureSchema);

module.exports = Adventure;
