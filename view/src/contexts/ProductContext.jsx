// Product context

import { createContext, useContext, useState } from "react";
import axios from "../axios_api/axios";

export const ProductContext = createContext()

function ProductContextProvider({ children }) {

    const [products, setProducts] = useState([])
    const [productEditor, setProductEditor] = useState(null) 
    const [updateError, setUpdateError] = useState('')

    const [updateFormData, setUpdateFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        images: []
      })

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
        try {
            const response = await axios.post('api/products', data)
            setUpdateError('')

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

    const handleUpdateChange = e => {
        setUpdateFormData(state => ({
          ...state,
          [e.target.id]: e.target.value
        }))
    }

    const handleUpdateFileChange = async (e) => {
        let files = e.target.files  
        
        const images = await imagebase64(files)
    
        setUpdateFormData(state => ({
          ...state,
          images: images
        }))
    
      }

    const imagebase64 = async (files) => {
        // Turn several files into Base64 format: https://stackoverflow.com/a/67296403
        let newFiles = Array.from(files).map(file => {

            let reader = new FileReader()
            reader.readAsDataURL(file)

            return new Promise(resolve => {
                reader.onload = () => resolve(reader.result)
                reader.onerror = (err) => reject(err)

            })
        })

        let res = await Promise.all(newFiles)
        return res
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        setUpdateError('')
    
        try {
    
          updateProduct(productEditor, updateFormData)
          setUpdateFormData({
            name: '',
            price: '',
            description: '',
            category: '',
            images: '',
          })
    
          setProductEditor(null)
          
        } catch (err) {
            setUpdateError(err)
            console.log(err.response?.data?.message || 'Something went wrong')
        } 
    }

    const updateProduct = async( product, data ) => {
        try {
            const response = await axios.put(`api/products/${product._id}`, data)
            setUpdateError('')

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
        } catch (err) {
            setUpdateError(err)
            console.error(err.message)
            return
        }
    }

    const removeProduct = async (product) => {
        try {
          let res = await axios.delete(`/api/products/${product._id}`)
          if(res.status !== 204) return
    
          const updatedProducts = products.filter((item) => item._id !== product._id)
          setProducts(updatedProducts)
          setUpdateError('')
        
        } catch (err) {
          setUpdateError(err)
          console.log(err)
        }
    }

    const values = {
        createProduct,
        getProducts,
        products, 
        setProducts,
        updateError,
        setUpdateError,
        updateProduct,
        productEditor,
        setProductEditor,
        handleUpdateChange,
        handleUpdateFileChange,
        handleUpdateSubmit,
        removeProduct,
        updateFormData,
        setUpdateFormData
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