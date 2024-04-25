var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', passport.authenticate('local', { failureRedirect: '/' }), function (req, res) {
  res.render('login/logins');
});

module.exports = router;
