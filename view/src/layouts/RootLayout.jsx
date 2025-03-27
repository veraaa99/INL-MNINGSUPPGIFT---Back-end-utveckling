import { Outlet } from "react-router"
import Navbar from "../components/Navbar"

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <footer>Hej</footer>
    </div>
  )
}
export default RootLayout