var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const adminsController = require("../controllers/adminControllers");
const  checkAuth  = require('../middleware/auth');

router.get('/',checkAuth, adminsController.admin_dashboard_get);
router.get('/api', adminsController.admin_dashboard_get);

module.exports = router;
