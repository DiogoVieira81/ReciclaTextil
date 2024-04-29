var express = require("express");
var router = express.Router();
const multer=require('multer')
const donorsController = require("../controllers/donorControllers");

router.get("/", function (req, res) {
    res.render("donors");
  });
// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get("/", function (req, res, next) {
  res.render("entities");
});

router.get("/create", donorsController.donor_create_get);

router.post("/create",upload.single("image"), donorsController.donor_create_post);

router.get("/update/:id", donorsController.donor_update_get);

router.post("/update:id", donorsController.donor_update_post);

router.get("/delete:id", donorsController.donor_delete_get);

router.post("/delete:id", donorsController.donor_delete_post);

router.get("/list", donorsController.donor_list);


module.exports = router;