var express = require("express");
var router = express.Router();
const multer=require('multer')
const path=require('path')
const Entity=require('../models/Entity')
const entitiesController = require("../controllers/entityControllers");
const uploadPath = path.join("./public", Entity.coverPath);
const  checkAuth  = require('../middleware/auth');
/*const checkAuth = (req, res, next) => {
    if (req.session.user_id) {
      next(); // O usuário está autenticado, pode prosseguir
    } else {
      res.status(401).json({ message: "Não autorizado" });
    }
  };*/

 const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  
 const upload = multer({
     dest: uploadPath,
     fileFilter: (req, file, callback) => {
       callback(null, imageMimeTypes.includes(file.mimetype));
     },
   });

router.get("/create",checkAuth,entitiesController.entity_create_get);

router.post("/create",checkAuth,upload.single("cover"),entitiesController.entity_create_post);

router.get("/update/:id",checkAuth, entitiesController.entity_update_get);

router.post("/update/:id",checkAuth, entitiesController.entity_update_post);

router.get("/delete/:id",checkAuth, entitiesController.entity_delete_get);

router.post("/delete/:id",checkAuth, entitiesController.entity_delete_post);

router.get("/list",checkAuth, entitiesController.entity_list);


module.exports = router;
