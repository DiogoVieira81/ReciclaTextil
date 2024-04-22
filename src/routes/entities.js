var express = require("express");
var router = express.Router();
const entitiesController = require("../controllers/entityControllers");

router.get("/", function (req, res, next) {
  res.render("entities");
});

router.get("/create", entitiesController.entity_create_get);

router.post("/create", entitiesController.entity_create_post);

router.get("/update", entitiesController.entity_update_get);

router.post("/update", entitiesController.entity_update_post);

router.get("/delete", entitiesController.entity_delete_get);

router.post("/delete", entitiesController.entity_delete_post);

router.get("/list", entitiesController.entity_list);

router.get("/show/:id", entitiesController.entity_detail);

module.exports = router;
