import { NavLink } from "react-router"

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-end">
        <ul className="flex gap-5 m-5">
          <li><NavLink className='cursor-pointer' to="/">HOME</NavLink></li>
          <li><NavLink className='cursor-pointer' to="/products">PRODUCTS</NavLink></li>
            <li><NavLink className='cursor-pointer' to="/login">LOGIN</NavLink></li> 

              <li><NavLink className='cursor-pointer' to="/profile">PROFILE</NavLink></li>
              <li><NavLink className='cursor-pointer' to="/messages">SEND MESSAGE</NavLink></li>
              <button className='cursor-pointer'>CART</button>            
        </ul>
      </div>
    </div>
  )
}
export default Navbar