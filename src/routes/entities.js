var express = require('express');
var router = express.Router();

router.get('/entities/:id', function(req, res) {
  entities.show(req, res);
});

// Save entity
router.post('/save', function(req, res) {
  entities.save(req, res);
});

module.exports = router;