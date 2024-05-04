var express = require("express");
var router = express.Router();
const multer=require('multer');
const path=require('path');
const donorsController = require("../controllers/donorControllers");
const  Donor=require('../models/Donor')
const uploadPath = path.join("./public", Donor.coverImageBasePath);

const checkAuth = (req, res, next) => {
  if (req.session.user_id) {
    next(); // O usuário está autenticado, pode prosseguir
  } else {
    res.status(401).json({ message: "Não autorizado" });
  }
};

  //tipos de imagens que vai aceitar
  const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  
  const upload = multer({
      dest: uploadPath,
      fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
      },
    });

router.get("/create",checkAuth, donorsController.donor_create_get);

router.post("/create",checkAuth,upload.single("cover"), donorsController.donor_create_post);

router.get("/update/:id",checkAuth, donorsController.donor_update_get);

router.post("/update/:id",checkAuth, donorsController.donor_update_post);

router.get("/delete/:id",checkAuth, donorsController.donor_delete_get);

router.post("/delete/:id",checkAuth, donorsController.donor_delete_post);

router.get("/list", checkAuth,donorsController.donor_list);


module.exports = router;