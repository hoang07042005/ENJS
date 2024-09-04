const express = require('express');
const router = express.Router();
const Product = require('../models/productModel'); // Import the Product model
const productController = require('../controllers/productController');
const methodOverride = require('method-override'); // For handling DELETE requests

// Middleware to use method-override
router.use(methodOverride('_method'));

// Route to display the "Add Product" page with existing products
router.get('/add', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('admin/addProduct', { products }); // Pass products to the view
    } catch (error) {
        console.error('Error retrieving products:', error); 
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
});

// Route to display the edit product form
router.get('/edit/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('admin/editProduct', { product });
    } catch (error) {
        console.error('Error retrieving product:', error); 
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
});

// Route to update the product
router.post('/edit/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
        res.redirect('/products/add');
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
});

// Route to delete the product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.redirect('/products/add');
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});

// Other routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.get('/suggestions/:id', productController.getSuggestedProducts);

module.exports = router;
