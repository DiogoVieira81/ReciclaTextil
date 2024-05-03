var express = require("express");
var router = express.Router();
const multer=require('multer')
const path=require('path')
const donorsController = require("../controllers/donorControllers");

// Configuração do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/create", donorsController.donor_create_get);

router.post("/create",upload.single("file"), donorsController.donor_create_post);

router.get("/update/:id", donorsController.donor_update_get);

router.post("/update/:id", donorsController.donor_update_post);

router.get("/delete/:id", donorsController.donor_delete_get);

router.post("/delete/:id", donorsController.donor_delete_post);

router.get("/list", donorsController.donor_list);


module.exports = router;