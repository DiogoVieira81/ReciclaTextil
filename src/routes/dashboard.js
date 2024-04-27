var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');

/* GET home page. */
router.get('/', /*connectEnsureLogin.ensureLoggedIn(),*/ (req, res) => {
  res.render('dashboard');
});

module.exports = router;
