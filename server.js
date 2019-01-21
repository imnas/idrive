const express = require('express');
const app = express();
const config = require('./config/config');
const bodyParser = require('body-parser');
const db = require('mongoose');
const authRoute = require('./routes/api/auth');
const profileRoute = require('./routes/api/profile');
const usersRoute = require('./routes/api/users');
const resultsRoute = require('./routes/api/results');
const passport = require('passport');
const cors = require('cors');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TEMP: Remove after testing
app.use(cors())

// Mongoose
db.connect(config.db.mongoURL, { useNewUrlParser: true }, (err) => {
  if(err) {
    throw err;
  } else {
    console.log('Mongoose Connection Established!');
  }
})

// Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/users', usersRoute);
app.use('/api/results', resultsRoute);

// Server
app.listen(config.app.port, () => console.log(`Server's running on port ${config.app.port}!`));