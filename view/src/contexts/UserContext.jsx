import { createContext, useContext, useState } from "react"
import axios from "../axios_api/axios"

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState('')
  const [token, setToken] = useState('')
  // const [userReady, setUserReady] = useState(false)
  const [rememberUser, setRememberUser] = useState(false)

  const register = async (credentials) => {
      const res = await axios.post('api/auth/register', credentials)
      if(res.status === 201){
          setToken(res.data.token)
          setUser({
              _id: res.data._id,
              name: res.data.name,
              role: res.data.role
          })
      }
      if(rememberUser) {
          sessionStorage.setItem('jwt', res.data.token)
      }
  }

  const login = async (userInformation) => {
      const res = await axios.post('api/users/login', userInformation)
      console.log(res)
      if(res.status === 200){
          setToken(res.data.token)
          setUser({
              _id: res.data._id,
              name: res.data.name,
          })
      }
      if(rememberUser) {
          sessionStorage.setItem('jwt', res.data.token)
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