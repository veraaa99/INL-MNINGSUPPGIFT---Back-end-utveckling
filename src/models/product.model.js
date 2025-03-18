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
            "https://images.unsplash.com/flagged/1/apple-gear-looking-pretty.jpg?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/1/type-away-numero-dos.jpg?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/1/work-stations-plus-espresso.jpg?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ]
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

export default Product