import { Navigate, Outlet, useLocation } from "react-router"
import { useUserContext } from "../contexts/UserContext"

const UserLayout = () => {

  const { user } = useUserContext()
  const location = useLocation()

  return (
    user
    ? <Outlet />
    : <Navigate to="/login" state={{ from: location.pathname }}/>
  )

}

export default UserLayout