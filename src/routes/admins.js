var express = require("express");
var router = express.Router();
const adminsController = require("../controllers/adminControllers");
const  checkAuth  = require('../middleware/auth');
/*const checkAuth = (req, res, next) => {
    if (req.session.user_id) {
      next(); // O usuário está autenticado, pode prosseguir
    } else {
      res.status(401).json({ message: "Não autorizado" });
    }
  };*/

router.get("/create", checkAuth,adminsController.admin_create_get);

router.post("/create",checkAuth, adminsController.admin_create_post);

router.get("/delete/:id", checkAuth,adminsController.admin_delete_get);

router.post("/delete/:id",checkAuth, adminsController.admin_delete_post);

router.get("/update",checkAuth,adminsController.admin_update_get);

router.post("/update",checkAuth,adminsController.admin_update_post);

router.get("/list", checkAuth,adminsController.admin_list);

/*router.get("/login:id", adminsController.admin_login_get);

router.post("/login:id", adminsController.admin_login_post);

router.get("/", adminsController.admin_login_get);*/

module.exports = router;