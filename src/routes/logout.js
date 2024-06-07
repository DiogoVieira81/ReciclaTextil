
var express = require('express');
var router = express.Router();
const logoutController=require('../controllers/logoutController');
 

router.get('/',logoutController.session_logout);

router.get('/api',logoutController.session_logout_json);
module.exports = router;