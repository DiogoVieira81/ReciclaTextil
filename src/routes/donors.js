var express = require("express");
var router = express.Router();
const donorsController = require("../controllers/donorControllers");

router.get("/", function (req, res) {
    res.render("donors");
  });

router.get("/create", donorsController.donor_create_get);

router.post("/create", donorsController.donor_create_post);

router.get("/update", donorsController.donor_update_get);

router.post("/update", donorsController.donor_update_post);

router.get("/delete", donorsController.donor_delete_get);

router.post("/delete", donorsController.donor_delete_post);

router.get("/list", donorsController.donor_list);

router.get("/show/:id", donorsController.donor_detail);

module.exports = router;