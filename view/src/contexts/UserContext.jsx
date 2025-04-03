import { createContext, useContext, useState } from "react"
import axios from "../axios_api/axios"

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  // const [userReady, setUserReady] = useState(false)
  const [rememberUser, setRememberUser] = useState(false)

  const register = async (userInformation) => {
      const res = await axios.post('api/users/register', userInformation)

      if(!res.status === 201) return
      
      setToken(res.data.userToken)
      setUser({
         _id: res.data._id,
         email: res.data.email,
      })

      if(rememberUser) {
          sessionStorage.setItem('jwt', res.data.userToken)
      }
  }

  const login = async (userInformation) => {
      const res = await axios.post('api/users/login', userInformation)
      console.log(res)
      console.log(res.data.userToken)
      console.log(res.data._id)
      console.log(res.data.email)

      if(!res.status === 200) return
      
      setToken(res.data.userToken)
      setUser({
         _id: res.data._id,
         email: res.data.email,
      })
      
      if(rememberUser) {
          sessionStorage.setItem('jwt', res.data.userToken)
      }
  }
  
  const logout = () => {
      sessionStorage.removeItem('jwt')
      setToken(null)
      setUser(null)
  }

  const toggleRememberUser = () => {
      setRememberUser(state => {
          if(!state) {
              localStorage.setItem('rememberUser', 'true')
          } else {
              localStorage.removeItem('rememberUser')
          }

          return !state
      })
  }

  const value = {
      user,
      token,
      login,
      register,
      logout,
      rememberUser,
      toggleRememberUser,
      // authReady
  }

  return (
      <UserContext.Provider value={value}>
          { children }
      </UserContext.Provider>
  )
}

export default UserContextProvider

export const useUserContext = () => {
    const context = useContext(UserContext)

    if(!context) throw new Error('useUserContext must be called inside a UserContextProvider')

    return context
}