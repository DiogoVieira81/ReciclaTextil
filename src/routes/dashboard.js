var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const adminsController = require("../controllers/adminControllers");

/* GET home page. */
router.get('/', adminsController.admin_dashboard_get);

module.exports = router;
