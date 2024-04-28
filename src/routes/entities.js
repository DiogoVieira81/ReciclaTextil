var express = require("express");
var router = express.Router();
const multer=require('multer')
const entitiesController = require("../controllers/entityControllers");

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

router.get("/create",entitiesController.entity_create_get);

router.post("/create",upload.single("image"),entitiesController.entity_create_post);

router.get("/update/:id", entitiesController.entity_update_get);

router.post("/update/:id", entitiesController.entity_update_post);

router.get("/delete/:id", entitiesController.entity_delete_get);

router.post("/delete/:id", entitiesController.entity_delete_post);

router.get("/list", entitiesController.entity_list);


router.get("/show/:id", entitiesController.entity_detail);

module.exports = router;
