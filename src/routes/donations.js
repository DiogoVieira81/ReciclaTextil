var express = require("express");
var router = express.Router();
const donationController = require("../controllers/donationControllers");

const checkAuth = (req, res, next) => {
    if (req.session.user_id) {
      next(); // O usuário está autenticado, pode prosseguir
    } else {
      res.status(401).json({ message: "Não autorizado" });
    }
  };

router.get("/create",checkAuth, donationController.donation_create_get);

router.post("/create", checkAuth,donationController.donation_create_post);

router.get("/update/:id", checkAuth,donationController.donation_update_get);

router.post("/update/:id", checkAuth,donationController.donation_update_post);

router.get("/delete/:id", checkAuth,donationController.donation_delete_get);

router.post("/delete/:id",checkAuth, donationController.donation_delete_post);

router.get("/list",checkAuth, donationController.donation_list);

router.post('/calculatePoints', checkAuth,donationController.donation_calculate_points);


module.exports = router;