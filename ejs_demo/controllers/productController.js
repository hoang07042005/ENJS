const Product = require('../models/productModel');
const mongoose = require('mongoose');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
};




exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const suggestedProducts = await Product.find({
            category: product.category,
            _id: { $ne: product._id }
        }).limit(3);

        res.render('productDetails', { product, suggestedProducts });
    } catch (error) {
        console.error('Error retrieving product:', error.message); 
        res.status(500).json({ message: 'Error retrieving product', error: error.message }); 
    }
};


exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body); 
        await product.save();
        res.status(201).redirect('/products');
    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        }); // For Mongoose
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.redirect(`/products/${product._id}`);
    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.redirect('/products');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};


exports.getSuggestedProducts = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const suggestedProducts = await Product.find({ category: product.category }).limit(4);

        res.json(suggestedProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving suggested products', error });
    }
};




