var express = require('express');
const asyncHandler = require("express-async-handler");
var router = express.Router();
const entitiesController = require('../controllers/entityControllers');

// Create entity
router.get('/', function(req, res) {
  res.render('entities/create');
});


module.exports = router;