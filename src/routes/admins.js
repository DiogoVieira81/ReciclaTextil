var express = require("express");
var router = express.Router();
const adminsController = require("../controllers/adminControllers");

/*router.get("/create", adminsController.admin_create_get);

router.post("/create", adminsController.admin_create_post);

router.get("/update/:id", adminsController.admin_update_get);

router.post("/update/:id", adminsController.admin_update_post);

router.get("/delete:id", adminsController.admin_delete_get);

router.post("/delete:id", adminsController.admin_delete_post);

router.get("/login:id", adminsController.admin_login_get);

router.post("/login:id", adminsController.admin_login_post);*/

router.get("/", adminsController.admin_login_get);

module.exports = router;