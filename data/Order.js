const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
});

// Define the schema for the order
const orderSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    info: {
        type: String
    },
    value: {
        type: Number,
        required: true
    },
    products: [productSchema] // Embedding the product schema as an array within the order schema
});

// Create a model based on the order schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
