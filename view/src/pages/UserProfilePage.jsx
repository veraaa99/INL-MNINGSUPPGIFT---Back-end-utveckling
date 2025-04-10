import axios from "../axios_api/axios"
import { useEffect, useState, useTransition } from "react"
import { NavLink } from "react-router"

import { useUserContext } from "../contexts/UserContext"
import { useShoppingCartContext } from "../contexts/ShoppingCartContext"

const UserProfilePage = () => {

  const { token, logout, user } = useUserContext()
  const { orderProducts, getShoppingCartProducts } = useShoppingCartContext()
  
  const [orders, setOrders] = useState([])
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    getShoppingCartProducts()
    getUserOrders()
  }, [])

  const getUserOrders = async() => {
    try {
      const res = await axios.get('/api/orders', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
  
      if(res.status !== 200) return
  
      setOrders(res.data)
      console.log(orders)
      return
      
    } catch (error) {
      console.log(error.response?.data?.message || 'Something went wrong')
      return
    }
  }

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get('api/users/profile', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        if(res.status !== 200) return
        setUserProfile(res.data)
        console.log(res.data)
  
        console.log(user)
        console.log(token)
  
      } catch (err) {
        console.log(err.message)
      }
    }
    getUserProfile()
  }, [])
  
  console.log(userProfile)
  const handleLogout = () => {
    logout()
    return
  }
  
  return (
    <div className="m-auto p-10">

      <h1 className='text-5xl justify-self-center p-5'>USER</h1>
      {
        user &&
          <div>
            <h2 className='text-xl justify-self-start p-5'>Email</h2>
            <p className='p-2 mx-4'>{user.email}</p>
          </div>
      }
      <div>

        <h3 className='text-xl justify-self-start p-5'>Shopping cart: </h3>
        { 
          !!orderProducts.length 
          ? 
          <>
              <div className="border-b p-5 w-full space-y-2 max-h-40 overflow-y-auto scrollbar">
                  {
                    orderProducts.map((orderProduct) => (
                      <div className="flex flex-col gap-2" key={orderProduct.product._id}>
                        <p>{orderProduct.product.name}</p>
                        <p>Quantity: {orderProduct.quantity}</p>
                        <button className='block p-2 bg-amber-300 rounded-xl w-30' type="button">Add to cart</button>
                      </div>
                    ))
                  }
              </div>
              <button className='cursor-pointer hover:bg-indigo-400 hover:text-white m-5 p-3 border-3 border-solid border-slate-400 rounded-md text-lg'><NavLink to="/orders">Checkout</NavLink></button>
          </>
          : 'Your cart is empty'
        }
        
        <h3 className='text-xl justify-self-start p-5'>Previous orders: </h3>
        <div>
          { 
            !!orders.length 
            ? 
            orders.map((order) => (
              <div className='flex flex-col text-sm border-1 rounded-2xl mb-5 p-7 justify-between mt-3 flex-wrap' key={order._id}>
                <h4 className='text-lg justify-self-start mb-2'>OrderId: {order._id}</h4>
                      { 
                        order.products.map((product) => {
                          return (
                            product.productId == null
                            ? 
                              <ul className="mx-5 w-full h-full mb-5" key={Math.random()}>
                                  <li className='py-1'>Product: Product is no longer avaliable</li>
                                  <li className='py-1'>Price: Unknown</li>
                              </ul>
                            :
                            <ul className="mx-5" key={product.productId._id}>
                              <div className="w-full h-full mb-5">
                                <li className='py-1'> Product: {product.productId.name}</li>
                                <li className='py-1'>Price: {product.productId.price} kr</li>
                              </div>
                            </ul>
                          )
                        })
                      }

                <p className='mx-5 my-4'>Total order price: {order.totalPrice}</p>
              </div>
            ))
            : (
              <div>No orders placed yet</div>
            )
          }  
        </div>

      </div>

      <div className="mt-10">
        <button className='text-lg justify-self-start p-5 py-3 border-2 rounded-2xl' type="button" onClick={handleLogout}>Logout</button>      
      </div>

    </div>
  )
}
export default UserProfilePage