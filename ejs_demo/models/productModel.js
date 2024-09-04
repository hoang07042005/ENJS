const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    category: {
        type: String,
        required: [true, 'Category is required']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    image: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
