const express = require('express');
const app = express();
const config = require('./config/config');
const bodyParser = require('body-parser');
const db = require('mongoose');
const authRoute = require('./routes/api/auth');
const passport = require('passport');

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.listen(config.app.port, () => console.log(`Server's running on port ${config.app.port}!`));