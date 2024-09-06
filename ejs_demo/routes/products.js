const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const productController = require('../controllers/productController');
const adminController = require('../controllers/adminController');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// adminController
router.get('/add', adminController.getAddProductPage);

router.get('/edit/:id', adminController.getEditProductPage);

router.post('/edit/:id', adminController.updateProduct);

router.delete('/:id', adminController.deleteProduct);



//productController
router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.get('/suggestions/:id', productController.getSuggestedProducts);



module.exports = router;


