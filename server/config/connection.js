// Require mongoose
const mongoose = require('mongoose');

// mongoose create or connect to our database 
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fanFictionDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
