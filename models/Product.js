const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter product name'],
            trim: true,
        },

        description: {
            type: String,
            required: [true, 'Please enter product description']
        },

        quantity: {
            type: Number,
            required: [true, 'Please enter product quantity'],
            maxlength: [5, 'quantity cannot exceed 5 characters'],
            default: 0
        },

        price: {
            type: Number,
            required: [true, 'Please enter product price'],
            maxlength: [5, 'Product price cannot exceed 5 characters'],
            default: 0.00
        }
    }
)

module.exports = mongoose.model('Product', ProductSchema)