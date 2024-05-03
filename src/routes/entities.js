var express = require("express");
var router = express.Router();
const multer=require('multer')
const path=require('path')
const Entity=require('../models/Entity')
const entitiesController = require("../controllers/entityControllers");

const uploadPath = path.join("./public", Entity.coverPath);

 const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];
  
 const upload = multer({
     dest: uploadPath,
     fileFilter: (req, file, callback) => {
       callback(null, imageMimeTypes.includes(file.mimetype));
     },
   });

router.get("/create",entitiesController.entity_create_get);

router.post("/create",upload.single("cover"),entitiesController.entity_create_post);

router.get("/update/:id", entitiesController.entity_update_get);

router.post("/update/:id", entitiesController.entity_update_post);

router.get("/delete/:id", entitiesController.entity_delete_get);

router.post("/delete/:id", entitiesController.entity_delete_post);

router.get("/list", entitiesController.entity_list);


module.exports = router;
