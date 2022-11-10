const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const adventureSchema = new Schema(
  { //creating fields
    adventureTitle: { //validators for fields
      type: String,
      required: true,
    },
    adventureBody: {
      type: String,
      required: true,
      trim: true,
    },
    adventureAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Adventure = model('Adventure', adventureSchema);

module.exports = Adventure;


