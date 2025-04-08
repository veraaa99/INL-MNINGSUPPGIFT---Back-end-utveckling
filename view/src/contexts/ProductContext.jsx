import { createContext, useContext, useState } from "react";
import axios from "../axios_api/axios";
// import fs from 'fs'
// import path from "path"
// import multer from "multer";

export const ProductContext = createContext()

function ProductContextProvider({ children }) {

    const [products, setProducts] = useState([])

    const getProducts = async() => {
          try {
            let res = await axios.get('/api/products')
            if(res.status !== 200) return
      
            setProducts(res.data)
            return

          }
          catch(error) {
            console.log(error.message)
            return

          }
    }

    const createProduct = async( data ) => {
        console.log(data)

        try {

            // const tempPath = data.images.path
            // console.log(tempPath)
            // const targetPath = path.join(__dirname, "./uploads/image.png")
            // console.log(targetPath)
        
            // const contents = fs.readFileSync(images, {encoding: 'base64'});

            // const upload = multer({ dest: 'uploads/' })
            // console.log(upload)

            const response = await axios.post('api/products', data)

            if(response.status === 201){
                
                setProducts({
                    name: response.name,
                    price: response.price,
                    description: response.description,
                    category: response.category,
                    images: response.images
                })
            }
            
            return
        } catch (error) {
            console.error(error.message)
            return
        }
    }

    const values = {
        createProduct,
        getProducts,
        products, 
        setProducts
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