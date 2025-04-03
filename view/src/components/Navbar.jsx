import { NavLink } from "react-router"
import { useUserContext } from "../contexts/UserContext"
import { useEffect, useState } from "react"
import { useShoppingCartContext } from "../contexts/ShoppingCartContext"

const Navbar = () => {

  const { user } = useUserContext()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { getShoppingCartProducts, orderProducts } = useShoppingCartContext()

  useEffect(() => {
    getShoppingCartProducts()
  }, [orderProducts])
  
  return (
    <div>
      <div className="flex justify-end">
        <ul className="flex gap-5 m-5">
          <li><NavLink className='cursor-pointer' to="/">HOME</NavLink></li>
          <li><NavLink className='cursor-pointer' to="/products">PRODUCTS</NavLink></li>
          <li><NavLink className='cursor-pointer' to="/messages">SEND MESSAGE</NavLink></li>
          { user == null
            ? 
              <li><NavLink className='cursor-pointer' to="/login">LOGIN</NavLink></li> 
            : 
              <>
                <li><NavLink className='cursor-pointer' to="/profile">PROFILE</NavLink></li>
                <button className='cursor-pointer' onClick={() => setIsCartOpen(state => !state)}>CART</button> 
                { isCartOpen &&
                  <div className='modal bg-white rounded-md' onClick={e => e.stopPropagation()}> 
                  { 
                  !!orderProducts.length 
                  ? 
                  <>
                      <div className="border-b p-2 w-full space-y-2 max-h-40 overflow-y-auto scrollbar">
                          {
                            orderProducts.map((product) => (
                              <div key={product._id}>
                                <p>{product.name}</p>
                              </div>
                            ))
                          }
                      </div>
                      <button className='cursor-pointer hover:bg-indigo-400 hover:text-white m-3 p-3 border-3 border-solid border-slate-400 rounded-md text-lg'><NavLink to="/orders" onClick={() => setIsCartOpen(state => !state)}>Checkout</NavLink></button>
                  </>
                  : 'Your cart is empty'
                  }
                  </div>
                }  
              </>
          }      
        </ul>
      </div>
    </div>
  )
}
export default Navbar