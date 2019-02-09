const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Learner = mongoose.model('learners');
const Instructor = mongoose.model('instructors');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_KEY;

module.exports = passport => { passport.use(new JwtStrategy(opts, (jwt_payload, done) => { 
  Instructor.findById(jwt_payload.id)
  .then(user => {
  if (user) {
    return done(null, user);
  } else {
    Learner.findById(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  }
  })
  .catch(err => console.log(err))
  })) 
};