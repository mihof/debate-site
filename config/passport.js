var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var Debater = require('../models/debater');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    Debater.findOne({ 'googleId' : profile.id }, function(err, debater) {
      if (err) return cb(err);
      if (debater) {
        return cb(null, debater);
      } else {
        var newDebater = new Debater({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newDebater.save(function(err) {
          if (err) return cb(err);
          returncb(null, newDebater);
        });
      }
    });  
  }
));

passport.serializeUser(function(debater, done) {
  done(null, debater.id)
});

passport.deserializeUser(function (id, done) {
  Debater.findById(id, function(err, debater) {
    done(err, debater);
  });
});