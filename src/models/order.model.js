import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: { type: mongoose.Schema.Types.Array, ref: 'OrderProducts', required: true },
    totalPrice: Number
    }, { timestamps: true 
 })

const orderProductsSchema = new mongoose.Schema({
    _id: Object,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
    quantity: { type: Number, required: true }
}, { timestamps: true, autoCreate: false, autoIndexId: false })

const OrderProducts = mongoose.model('OrderProducts', orderProductsSchema)
const Order = mongoose.model('Order', orderSchema)

export default Order 

 // products: [
    //     { 
    //         productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, 
    //         quantity: { type: Number, required: true }
    //     }
 // ],