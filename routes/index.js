var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/debaters/browse');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/debaters/browse',
    failureRedirect : '/debaters/browse'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/debaters/browse');
});

module.exports = router;
