var express = require("express");
var router = express.Router();
const multer=require('multer');
const path=require('path');
const fs=require('fs')
const donorsController = require("../controllers/donorControllers");
const  Donor=require('../models/Donor')
const uploadPath = path.join("./public", Donor.coverImageBasePath);

  //tipos de imagens que vai aceitar
  const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  
  const upload = multer({
      dest: uploadPath,
      fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
      },
    });

router.get("/create", donorsController.donor_create_get);

router.post("/create",upload.single("cover"), donorsController.donor_create_post);

router.get("/update/:id", donorsController.donor_update_get);

router.post("/update/:id", donorsController.donor_update_post);

router.get("/delete/:id", donorsController.donor_delete_get);

router.post("/delete/:id", donorsController.donor_delete_post);

router.get("/list", donorsController.donor_list);


module.exports = router;