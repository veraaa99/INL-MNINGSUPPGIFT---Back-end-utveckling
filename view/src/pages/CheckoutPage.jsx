// Checkout page

import { useState } from "react"
import axios from "../axios_api/axios"
import { useShoppingCartContext } from "../contexts/ShoppingCartContext"
import { useUserContext } from "../contexts/UserContext"

const CheckoutPage = () => {

    const { orderProducts, setOrderProducts, getTotalSum, addProductToCart, removeOneQuantityFromCart, removeProductFromCart } = useShoppingCartContext()
    const { token } = useUserContext()

    const [message, setMessage] = useState('')

    const placeOrder = async() => {
      const order = []

      orderProducts.map((orderProduct) => {
        order.push({ productId: orderProduct.product._id, quantity: orderProduct.quantity })
      })

      try {
        const res = await axios.post(`api/orders`, ({"products": order}) , {
          headers: {
              authorization: `Bearer ${token}`
          }
        })

        if(res.status === 201){
          setMessage('Order succesfully placed!')
          setOrderProducts([])
          console.log(orderProducts)
        }

      } catch (error) {
        setMessage(error.response?.data?.message || 'Something went wrong')
        console.log(error)
      }
    }

  return (
    <div className='px-20 grid md:mx-40 sm:mx-auto my-20 center-items'>
      <h1 className='text-5xl justify-self-center pb-20'>Checkout</h1>

        { 
          !!orderProducts.length
          ?
          <div className='flex flex-col p-5 text-sm border-1 rounded-2xl mb-5'>
            {
              orderProducts.map((orderProduct) => (
                  <ul className="mx-5" key={orderProduct.product._id}>
                    <div className="w-full h-full mb-5">
                      <div className="w-xs h-xs">
                        <img className='object-cover rounded-lg' src={orderProduct.product.images[0]} ></img>
                      </div>
                      <li className='p-2'> Product: {orderProduct.product.name}</li>
                      <li className='p-2'>Price: {orderProduct.product.price} kr</li>
                      <li className='p-2'>Quantity: {orderProduct.quantity}</li>
                      <div>
                        <button className='block p-2 bg-amber-300 rounded-xl m-2 cursor-pointer' type="button" onClick={() => addProductToCart(orderProduct.product)}>Add to cart</button>
                        <button className='inline m-1 p-1 bg-orange-600 rounded-lg text-sm cursor-pointer' type="button" onClick={() => removeOneQuantityFromCart(orderProduct.product)}>Remove one</button>
                        <button className='inline m-1 p-1 bg-orange-600 rounded-lg text-sm cursor-pointer' type="button" onClick={() => removeProductFromCart(orderProduct.product)}>Remove all</button>
                      </div>
                    </div>
                  </ul>
              ))
            }

            <div className='px-5'>
              <p className="text-lg">Total price: {getTotalSum()} kr</p>
              <div className="pt-20">
                <button className="cursor-pointer hover:bg-indigo-400 hover:text-white m-3 p-3 border-3 border-solid border-slate-400 rounded-md text-lg" onClick={() => placeOrder()}>Place Order</button>
              </div>
            </div>
          </div>
          : 
          <div className='flex flex-col p-5 text-sm border-1 rounded-2xl mb-5'>
            <p>Your cart is empty</p>
            <p className="text-center text-lg mt-5">{message}</p>
          </div>
        }

    </div>
  )
}

export default CheckoutPage