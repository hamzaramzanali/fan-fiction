// Require mongoose
const mongoose = require('mongoose');

// mongoose create or connect to our database 
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fanFictionDB', {
    // NOTE: FROM SLACK PASS IN FIELD WEBSITE
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
