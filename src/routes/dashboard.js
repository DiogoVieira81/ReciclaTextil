var express = require('express');
var router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const adminsController = require("../controllers/adminControllers");
const  checkAuth  = require('../middleware/auth');
/*const checkAuth = (req, res, next) => {
    if (req.session.user_id) {
      next(); // O usuário está autenticado, pode prosseguir
    } else {
      res.status(401).json({ message: "Não autorizado" });
    }
  };*/

/* GET home page. */
router.get('/',checkAuth, adminsController.admin_dashboard_get);

module.exports = router;
