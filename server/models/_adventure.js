const { Schema, model } = require('mongoose');

const adventureSchema = new Schema(
  { //creating fields
    title: { //validators for fields
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
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


