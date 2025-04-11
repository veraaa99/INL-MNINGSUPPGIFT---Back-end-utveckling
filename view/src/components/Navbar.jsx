// Navbar component

import { NavLink } from "react-router"
import { useUserContext } from "../contexts/UserContext"
import { useState } from "react"
import { useShoppingCartContext } from "../contexts/ShoppingCartContext"

const Navbar = () => {

  const { user } = useUserContext()
  const { orderProducts, addProductToCart,
    removeOneQuantityFromCart, removeProductFromCart, getTotalSum } = useShoppingCartContext()

  const [isCartOpen, setIsCartOpen] = useState(false)
  
  return (
    <div>
      <div className="flex justify-end">
        <ul className="flex gap-5 m-5">
          <li><NavLink className='cursor-pointer' to="/" onClick={() => setIsCartOpen(false)}>HOME</NavLink></li>
          <li><NavLink className='cursor-pointer' to="/products" onClick={() => setIsCartOpen(false)}>PRODUCTS</NavLink></li>
          <li><NavLink className='cursor-pointer' to="/messages" onClick={() => setIsCartOpen(false)}>SEND MESSAGE</NavLink></li>
          { user == null
            ? 
              <li><NavLink className='cursor-pointer' to="/login">LOGIN</NavLink></li> 
            : 
              <>
                <li><NavLink className='cursor-pointer' to="/profile" onClick={() => setIsCartOpen(false)}>PROFILE</NavLink></li>
                <button className='cursor-pointer' onClick={() => setIsCartOpen(state => !state)}>CART</button> 

                { isCartOpen &&
                  <div className='modal bg-white rounded-md' onClick={e => e.stopPropagation()}> 
                    { 
                    !!orderProducts.length 
                    ? 
                    <>
                        <div className="border-b p-2 w-full space-y-2 max-h-40 overflow-y-auto scrollbar">
                            {
                              orderProducts.map((orderProduct) => (
                                <div key={orderProduct.product._id}>
                                  <p>{orderProduct.product.name}</p>
                                  <p>{orderProduct.quantity}</p>
                                  <button className='inline m-1 p-1 bg-amber-300 rounded-lg text-sm cursor-pointer' type="button" onClick={() => addProductToCart(orderProduct.product)}>Add one</button>
                                  <button className='inline m-1 p-1 bg-orange-600 rounded-lg text-sm cursor-pointer' type="button" onClick={() => removeOneQuantityFromCart(orderProduct.product)}>Remove one</button>
                                  <button className='inline m-1 p-1 bg-orange-600 rounded-lg text-sm cursor-pointer' type="button" onClick={() => removeProductFromCart(orderProduct.product)}>Remove all</button>
                                </div>
                              ))
                            }
                          <div>
                            <p>Total price: {getTotalSum()} kr</p>
                          </div>
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