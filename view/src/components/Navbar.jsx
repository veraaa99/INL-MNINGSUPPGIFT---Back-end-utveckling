// Navbar component

import { NavLink } from "react-router"
import { useUserContext } from "../contexts/UserContext"
import { useState } from "react"
import { useShoppingCartContext } from "../contexts/ShoppingCartContext"
import CartDropdown from "./CartDropdown"
import Notifications from "./Notifications"

const Navbar = () => {

  const { user } = useUserContext()
  
  return (
    <div>
      <div className="flex justify-end relative">
        <ul className="flex gap-5 m-5 ">
          <li><NavLink className='cursor-pointer' to="/">HOME</NavLink></li>
          <li><NavLink className='cursor-pointer' to="/products">PRODUCTS</NavLink></li>
          <li><NavLink className='cursor-pointer' to="/messages">SEND MESSAGE</NavLink></li>
          { user == null
            ? 
              <li><NavLink className='cursor-pointer' to="/login">LOGIN</NavLink></li> 
            : 
              <>
                <li><NavLink className='cursor-pointer' to="/profile">PROFILE</NavLink></li>
                <CartDropdown />
              </>
          }      
        </ul>
      </div>
    </div>
  )
}
export default Navbar