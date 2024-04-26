var express = require("express");
var router = express.Router();
const adminsController = require("../controllers/adminControllers");

router.get("/create", adminsController.admin_create_get);

router.post("/create", adminsController.admin_create_post);

router.get("/update/:id", adminsController.admin_update_get);

router.post("/update/:id", adminsController.admin_update_post);

router.get("/delete", adminsController.admin_delete_get);

router.post("/delete", adminsController.admin_delete_post);

router.get("/login", adminsController.admin_login_get);

router.post("/login", adminsController.admin_login_post);

router.get("/show/:id", adminsController.admin_detail);

router.get('/dashboard', function(req, res) {
    res.render('dashboard');
  });

module.exports = router;