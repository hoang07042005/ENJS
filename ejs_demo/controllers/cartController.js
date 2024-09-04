const Product = require('../models/productModel');



let cart = [];

exports.getCart = (req, res) => {
    res.render('cart', { cart });
};

exports.addToCart = async (req, res) => {
    try {
        const productId = req.params.id;
        const quantity = parseInt(req.body.quantity, 10); 

        const product = await Product.findById(productId);

        if (!product) {
            return res.redirect('/products');
        }

        const existingProductIndex = cart.findIndex(p => p._id.toString() === productId);

        if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push({ ...product.toObject(), quantity });
        }

        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.redirect('/products');
    }
};

exports.removeFromCart = (req, res) => {
    const productId = req.params.id;
    cart = cart.filter(item => item._id.toString() !== productId);
    res.redirect('/cart');
};



