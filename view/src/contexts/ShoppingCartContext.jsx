import { createContext, useContext, useEffect, useState } from "react";
import axios from "../axios_api/axios";

export const ShoppingCartContext = createContext()

function ShoppingCartContextProvider({ children }) {

    const [orderProducts, setOrderProducts] = useState([])
    
    const addProductToCart = async (product) => {
        console.log(product)
        
        try {
            const res = await axios.get(`api/products/${product._id}`)
            
             // Check if the product already exists in the cart
            const item = orderProducts.find((i) => i._id === product._id)

            // If yes, then update the item's quantity
            if(item == undefined) {
                setOrderProducts(state => [
                    ...state,
                    res.data
                ])
            }    

            console.log(orderProducts)

        } catch (err) {
            console.error(err.message)
        }
    }

    const getShoppingCartProducts = async () => {
        try {
            return console.log(orderProducts)
        } catch (err) {
            console.error(err.message)
        }
    }

    const values = {
        addProductToCart,
        getShoppingCartProducts,
        orderProducts
    }

    return (
          <ShoppingCartContext.Provider value={values}>
              { children }
          </ShoppingCartContext.Provider>
      )

}

export default ShoppingCartContextProvider

export const useShoppingCartContext = () => {
    const context = useContext(ShoppingCartContext)

    if(!context) throw new Error('useShoppingCartContext must be called inside a ShoppingCartContextProvider')

    return context
}