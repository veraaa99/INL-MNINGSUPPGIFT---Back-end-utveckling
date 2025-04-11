// Register user page

import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useUserContext } from "../contexts/UserContext"

function RegisterPage() {

    const [userInformation, setUserInformation] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { register, rememberUser, toggleRememberUser } = useUserContext()
    const navigate = useNavigate()

    const handleSubmit = async e => {
      e.preventDefault()
      if(!userInformation.email || !userInformation.password || !userInformation.name || !userInformation.repeatPassword){
          setError('Please fill in all fields')
          return
      } else if(userInformation.password !== userInformation.repeatPassword) {
          setError('Passwords do not match')
          return
      }

      setLoading(true)
      setError('')

      try {
          await register(userInformation)
          navigate('/')
          
      } catch (err) {
          setError(err.response?.data?.message || 'Something went wrong')
      } finally {
          setLoading(false)
      }
    }
    
  return (
    <div className="m-10 p-5">
        <h2 className="text-4xl font-bold text-center">Register</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-3">
                <label htmlFor="email" className='block text-2xl'>Email</label>
                <input className='border rounded-lg p-1 w-full' type="email" name="email" id="email" onChange={e => setUserInformation(state => ({ ...state, [e.target.id]: e.target.value}))} value={userInformation.email}/>
            </div>
            <div className="space-y-3">
                <label htmlFor="password" className='block text-2xl'>Password</label>
                <input className='border rounded-lg p-1 w-full' type="password" name="password" id="password" onChange={e => setUserInformation(state => ({ ...state, [e.target.id]: e.target.value}))} value={userInformation.password}/>
            </div>
            <div className="space-y-3">
                <label htmlFor="repeatPassword" className='block text-2xl'>Repeat password</label>
                <input className='border rounded-lg p-1 w-full' type="password" name="repeatPassword" id="repeatPassword" onChange={e => setUserInformation(state => ({ ...state, [e.target.id]: e.target.value}))} value={userInformation.repeatPassword}/>
            </div>
            <div>
                <input type="checkbox" name="persist" id="persist" checked={rememberUser} onChange={toggleRememberUser}/>
                <label className="text-2xl" htmlFor="persist">Remember me</label>
            </div>
            <button className="text-2xl" disabled={loading}>{loading ? <p>Creating new user, please wait...</p> : 'Register'}</button>
        </form>
        <p className="text-red-500 text-center text-lg mt-5">{error}</p>
        <p className="text-center text-lg mt-5">Already have an account? <Link className="underline cursor-pointer" to="/login">Login</Link></p>
    </div>
  )
}
export default RegisterPage