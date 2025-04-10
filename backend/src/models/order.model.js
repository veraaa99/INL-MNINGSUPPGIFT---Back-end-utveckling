// Mongoose Order Schema

import mongoose from "mongoose";

// Order Schema (user (relation to User Schema), products (relation to Order Product Schema), total price)
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: { type: mongoose.Schema.Types.Array, ref: 'OrderProducts', required: true },
    totalPrice: Number
    }, { timestamps: true })

//  Order Product Schema (id, product id (relation to Product Schema), quantity)
const orderProductsSchema = new mongoose.Schema({
    _id: Object,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
    quantity: { type: Number, required: true }
}, { timestamps: true, autoCreate: false, autoIndexId: false })

// Create and export Mongoose Model
const OrderProducts = mongoose.model('OrderProducts', orderProductsSchema)
const Order = mongoose.model('Order', orderSchema)

export default Order 