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
        default: "None"
    },
    images: {
        type: [String], 
        default: [
            "https://unsplash.com/photos/yC-Yzbqy7PY",
            "https://unsplash.com/photos/LNRyGwIJr5c",
            "https://unsplash.com/photos/N7XodRrbzS0"
        ]
    }
}, { timestamps: true })

const Products = mongoose.model('Products', productSchema)

export default Products