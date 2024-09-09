const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');
const adminController = require('../controllers/adminController');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// adminController
router.get('/add', adminController.getAddProductPage);

router.get('/edit/:id', adminController.getEditProductPage);

router.post('/edit/:id', adminController.updateProduct);

router.delete('/:id', adminController.deleteProduct);

module.exports = router;


