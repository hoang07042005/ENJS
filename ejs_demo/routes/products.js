const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const productController = require('../controllers/productController');

const methodOverride = require('method-override');

router.use(methodOverride('_method'));




//productController
router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.get('/suggestions/:id', productController.getSuggestedProducts);




module.exports = router;


