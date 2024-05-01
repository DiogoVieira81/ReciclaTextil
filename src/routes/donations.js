var express = require("express");
var router = express.Router();
const donationController = require("../controllers/donationControllers");



router.get("/create", donationController.donation_create_get);

router.post("/create", donationController.donation_create_post);

router.get("/update/:id", donationController.donation_update_get);

router.post("/update/:id", donationController.donation_update_post);

router.get("/delete/:id", donationController.donation_delete_get);

router.post("/delete/:id", donationController.donation_delete_post);

router.get("/list", donationController.donation_list);

router.post('/calculatePoints', donationController.donation_calculate_points);


module.exports = router;