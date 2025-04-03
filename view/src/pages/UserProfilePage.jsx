import { useEffect, useState } from "react"
import { useUserContext } from "../contexts/UserContext"
import axios from "../axios_api/axios"

const UserProfilePage = () => {

  const { token } = useUserContext()
  const [user, setUser] = useState('')
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getUser = async() => {
      try {
        const res = await axios.get('api/users/profile', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })

        if(res.status !== 200) return
        setUser(res.data)
        return
        
      } catch (error) {
        console.log(error.response?.data?.message || 'Something went wrong')
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    const getUserOrders = async() => {
      try {
        const res = await axios.get('api/orders', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })

        if(res.status !== 200) return
        setOrders(res.data)
        return
        
      } catch (error) {
        console.log(error.response?.data?.message || 'Something went wrong')
      }
  
    }
    getUserOrders()
  }, [])
  

  return (
    <div className="m-auto p-10">
      <h1 className='text-5xl justify-self-center p-5'>USER</h1>
      <div>
        <h2 className='text-xl justify-self-start p-5'>Email</h2>
        <p>{user.email}</p>
      </div>
      <div>
        <h3 className='text-lg justify-self-start p-5'>Shopping cart: </h3>
        <h3 className='text-lg justify-self-start p-5'>My orders: </h3>
        <div>
          { 
            !!orders.length
            ? orders.map((order) => (
              <div className='flex flex-col text-sm' key={order._id}>
  
                <div className='flex flex-row justify-between mt-3 flex-wrap'>
                  <div className="mr-4">

                    {/* <p className='pt-2'>Category: {order.products.productId.category}</p> */}
                  </div>
                  <div className='grid justify-items-center py-2'>
                  <button type="button">Add to cart</button>
                  </div>
                </div>

                      { 
                        order.products.map((product) => {
                          
                          return (
                            <ul key={product.productId._id}>
                              <li className='p-2'> Product: {product.productId.name}</li>
                              <li className='p-2'>Price: {product.productId.price} kr</li>
                            </ul>
                          )
                      
                        })
                      }

                <p className='p-2'>Total order price: {order.totalPrice}</p>
                
              </div>
              ))
              : (
                <div>No orders placed yet</div>
              )
          }  
        </div>
      </div>
      <div>
      <button className='text-lg justify-self-start m-4 p-5 border-2 rounded-2xl' type="button">Logout</button>      
      </div>
    </div>
  )
}
export default UserProfilePage