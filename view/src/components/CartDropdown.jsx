import { NavLink } from "react-router"
import { useEffect, useState } from "react"
import { useShoppingCartContext } from "../contexts/ShoppingCartContext"
import { useUserContext } from "../contexts/UserContext"
import Notifications from "./Notifications"

const CartDropdown = () => {

    const { orderProducts, addProductToCart,
        removeOneQuantityFromCart, removeProductFromCart, getTotalSum } = useShoppingCartContext()
    const { user } = useUserContext()

    const [isCartOpen, setIsCartOpen] = useState(false)
    console.log(orderProducts)

  return (
    <>
        <button className='cursor-pointer' onClick={() => setIsCartOpen(state => !state)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
        </button> 
            { 
                isCartOpen
                ? 
                <div id="modal" className="fixed left-0 top-0 bg-gray-900/75 w-screen h-screen justify-center items-center" onClick={() => setIsCartOpen(state => !state)}>
        <div className="absolute border-1 rounded-xl bg-white border-white p-2 w-70 space-y-2 max-h-50 overflow-y-auto scrollbar right-5 top-15" onClick={(e) => e.stopPropagation()}>
                    { !!orderProducts.length 
                    ?
                    <>
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
                        <div>
                            <button className='cursor-pointer hover:bg-indigo-400 hover:text-white m-3 p-3 border-3 border-solid border-slate-400 rounded-md text-lg' onClick={() => setIsCartOpen(state => !state)}><NavLink to="/orders">Checkout</NavLink></button>
                        </div>
                    </>
                    :
                    'Your cart is empty'
                    }  
                </div>
        </div>
                : <Notifications />
            }
    </>
  )
}
export default CartDropdown