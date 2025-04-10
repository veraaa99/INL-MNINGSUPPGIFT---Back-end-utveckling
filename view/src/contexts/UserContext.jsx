import { createContext, useContext, useEffect, useState } from "react"
import axios from "../axios_api/axios"

export const UserContext = createContext()

const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
//   const [userReady, setUserReady] = useState(false)
  const [rememberUser, setRememberUser] = useState(false)

  useEffect(() => {
    const checkToken = async() => {
      try {
          if(!localStorage.getItem('rememberUser')) return
          setRememberUser(localStorage.getItem('rememberUser') === 'true')

          const token = sessionStorage.getItem('jwt')
          if(!token) return

          const res = await axios.get('api/users/check', {
              headers: {
                  authorization: `Bearer ${sessionStorage.getItem('jwt') || ''}`
              }
          })

          if(res.status === 200) {
              setToken(sessionStorage.getItem('jwt'))
              setUser(res.data)
            //   connectSocket(res.data.name)
          }

      } catch (error) {
          console.log(error.message)
          sessionStorage.removeItem('jwt')
      }
    //   finally {
    //       setAuthReady(true)
    //   }
    }
    checkToken()
  }, [])

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
      return
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