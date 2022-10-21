var express = require('express');
var router = express.Router();

const productsControllers = require("../controllers/products.controllers");

router.get('/getall',productsControllers.getAllProducts);
router.post('/addProducts',productsControllers.addProducts);
router.post('/updateProducts/:id',productsControllers.updateProducts);
router.post('/deleteProducts/:id',productsControllers.deleteProducts);



module.exports = router;
