// SHopping cart context

import { createContext, useContext, useEffect, useState } from "react";
import axios from "../axios_api/axios";

export const ShoppingCartContext = createContext()

function ShoppingCartContextProvider({ children }) {

   const [orderProducts, setOrderProducts] = useState([])
    
   const addProductToCart = async ( product ) => {
      try {
         await axios.get(`api/products/${product._id}`)
         const checkOrderProduct = orderProducts.find((orderProduct) => orderProduct.product._id === product._id)

         if(checkOrderProduct == undefined) {
            const newOrderProduct = {
               product,
               quantity: 1
            }

            setOrderProducts(state => [
               ...state,
               newOrderProduct
            ])
         } else {
            setOrderProducts(orderProducts.map(orderProduct => {
               if(orderProduct.product._id == checkOrderProduct.product._id) {

                  const prevQuantity = orderProduct.quantity
                  let newQuantity = prevQuantity + 1

                  return {...orderProduct, quantity: newQuantity}
               } else {
                  return orderProduct
               }
            }))
         }
      } catch (err) {
         console.error(err.message)
      }
   }

   const removeOneQuantityFromCart = async( product ) => {
      try {
         const checkOrderProduct = orderProducts.find((orderProduct) => orderProduct.product._id === product._id)

         if(checkOrderProduct) {
            setOrderProducts(orderProducts.map(orderProduct => {
               if(orderProduct.product._id == checkOrderProduct.product._id) {

                  const prevQuantity = orderProduct.quantity
                  let newQuantity = prevQuantity - 1

                  if(newQuantity == 0) {
                     removeProductFromCart(checkOrderProduct)
                     return
                  }

                  return {...orderProduct, quantity: newQuantity}

               } else {
                  return orderProduct
               }
            }))
         } 
         
      } catch (error) {
         console.log(error)
      }
   }

   const removeProductFromCart = ( orderProduct ) => {  
      const newOrderProducts = orderProducts.filter((product) => product.product._id !== orderProduct._id)
      setOrderProducts(newOrderProducts)
   }

   const getTotalSum = () => {
      
      let orderQuantity = []
      let orderSum = []
      let totalOrderSum = 0

      orderProducts.forEach(orderProduct => {
         orderQuantity.push(orderProduct.quantity)
      })

      orderProducts.forEach(orderProduct => {
         orderSum.push(orderProduct.product.price)
      })

      for(let i=0; i< orderQuantity.length; i++) {
         totalOrderSum += orderQuantity[i] * orderSum[i];
      }

      return totalOrderSum
   }

   const values = {
        addProductToCart,
        orderProducts,
        removeOneQuantityFromCart,
        removeProductFromCart,
        getTotalSum
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