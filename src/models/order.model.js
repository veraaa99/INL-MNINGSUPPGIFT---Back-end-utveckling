import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', quantity: Number, required: true }],
    totalPrice: Number
})

const Order = mongoose.model('Order', orderSchema)
export default Order