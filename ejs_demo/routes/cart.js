const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.getCart);

router.post('/add/:id', cartController.addToCart);

router.post('/remove/:id', cartController.removeFromCart);

module.exports = router;

