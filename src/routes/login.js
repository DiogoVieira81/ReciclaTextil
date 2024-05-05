var express = require('express');
var router = express.Router();
const passport = require('passport');
const app = require('../../app');
const loginController=require('../controllers/loginController');
/* GET home page. */




router.get('/', function (req, res) {
  res.render('login/logins');
});

router.post('/',loginController.login_session);
  


module.exports = router;
