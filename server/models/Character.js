const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedcharacter` array in User.js
const characterSchema = new Schema({
  name: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  // saved character id from Marvel Api
  characterId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = characterSchema;
