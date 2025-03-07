import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String, 
        default: "A new product added to the collection."
    },
    category: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        default: "A new product added to the collection."
    },
    category: {
        type: String, 
        required: true
    },
    images: {
        type: [String], 
        required: true
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

export default Product