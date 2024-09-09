const Product = require('../models/productModel');
const mongoose = require('mongoose');


exports.getAddProductPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10; 

        const options = {
            page,
            limit,
            sort: { createdAt: -1 } 
        };

        const result = await Product.paginate({}, options);
        
        res.render('admin/addProduct', {
            layout: 'admin/main',
            products: result.docs,
            currentPage: result.page,
            totalPages: result.totalPages
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};


exports.getEditProductPage = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        res.render('admin/editProduct', { layout: 'admin/main', product });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProduct) return res.status(404).send('Product not found');
        res.redirect('/admin/add');
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send('Product not found');
        res.redirect('/admin/add');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
