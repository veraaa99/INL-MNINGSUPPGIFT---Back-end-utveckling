import { NavLink } from "react-router"

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-end">
        <ul className="flex gap-5 m-5">
          <li><NavLink className='cursor-pointer' to="/">HOME</NavLink></li>
          <li><NavLink className='cursor-pointer' to="/products">PRODUCTS</NavLink></li>
          <li><NavLink className='cursor-pointer' to="/contact">CONTACT</NavLink></li>
          <li><NavLink className='cursor-pointer' to="/profile">LOGIN</NavLink></li>
          <button className='cursor-pointer'>CART</button>
        </ul>
      </div>
    </div>
  )
}
export default Navbar