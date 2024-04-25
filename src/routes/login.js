var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('login/logins');
});

router.post('/', passport.authenticate('local', { failureRedirect: '/' }), function (req, res) {
  res.redirect('/dashboard');
});

module.exports = router;
