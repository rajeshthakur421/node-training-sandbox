var express = require('express');
var router = express.Router();
const productController = require('../controllers/product.controllers');

router.post('/getAll',productController.getAll);
router.post('/create',productController.createProduct);
router.post('/update/:id', productController.updateProduct);
router.post('/delete/:id', productController.deleteProduct);
router.post('/search/:id', productController.searchProduct);


module.exports = router;
