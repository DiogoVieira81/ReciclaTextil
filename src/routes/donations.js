var express = require("express");
var router = express.Router();
const donationsController = require("../controllers/donationControllers");

router.get("/create", donationsController.donation_create_get);

router.post("/create", donationsController.donation_create_post);

router.get("/update", donationsController.donation_update_get);

router.post("/update", donationsController.donation_update_post);

router.get("/delete", donationsController.donation_delete_get);

router.post("/delete", donationsController.donation_delete_post);

router.get("/list", donationsController.donation_list);

router.get("/show/:id", donationsController.donation_detail);

module.exports = router;