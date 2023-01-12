var express = require('express');
var router = express.Router();
const categoriesController = require('../controllers/categories.controllers');

router.post('/getAll',categoriesController.getAll);
router.post('/create',categoriesController.createCategories);
router.post('/update/:id', categoriesController.updateCategories);
router.post('/delete/:id', categoriesController.deleteCategories);
router.post('/search/:id', categoriesController.searchCategories);


module.exports = router;
