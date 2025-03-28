import { createContext, useContext, useState } from "react";
import axios from "../axios_api/axios";

export const ProductContext = createContext()

function ProductContextProvider({ children }) {

    const [products, setProducts] = useState([])

    const createProduct = async ( data ) => {

        // const data = {
        //     name: data.name,
        //     price: data.price,
        //     description: data.description,
        //     category: data.category,
        //     images: data.images
        // }

        try {
            let response = await axios.post('api/products', data)
            if(response.status === 201){

                setProducts({
                    name: response.name,
                    price: response.price,
                    description: response.description,
                    category: response.category,
                    images: response.images
                })
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const values = {
        createProduct
    }

    return (
        <ProductContext.Provider value={values}>
            { children }
        </ProductContext.Provider>
    )

}

export default ProductContextProvider


export const useProductContext = () => {
    const context = useContext(ProductContext)

    if(!context) throw new Error('useProductContext must be called inside a ProductContextProvider')

    return context
}