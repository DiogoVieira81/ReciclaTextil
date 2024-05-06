var express = require('express');
var router = express.Router();
const loginController=require('../controllers/loginController');
/* GET home page. */




router.get('/', function (req, res) {
  res.render('login/logins',{error:''});
});

router.post('/',loginController.login_session);
  


module.exports = router;
