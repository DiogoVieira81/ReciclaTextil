var express = require('express');
var router = express.Router();
const entitiesController = require('../controllers/entityControllers');

router.get('/').get(entitiesController.getAllEntities);

router.get('/').post(entitiesController.createEntity);

//router.route('/:id').get(entitiesController.getEntity);
//router.route('/:id').put(entitiesController.updateEntity);
//router.route('/:id').delete(entitiesController.deleteEntity);

module.exports = router;