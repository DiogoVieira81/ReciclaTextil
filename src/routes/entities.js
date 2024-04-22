var express = require('express');
const asyncHandler = require("express-async-handler");
var router = express.Router();
const entitiesController = require('../controllers/entityControllers');

router.get('/entities/:id', function(req, res) {
  entities.show(req, res);
});

// Create entity
router.post('/create', function(req, res) {
  entitiesController.entity_create_post(req, res);
});


module.exports = router;