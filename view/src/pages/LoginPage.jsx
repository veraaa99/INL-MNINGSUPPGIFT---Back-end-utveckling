// Login user page

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { useUserContext } from "../contexts/UserContext"

function LoginPage() {

    const [userInformation, setUserInformation] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login, rememberUser, toggleRememberUser } = useUserContext()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async e => {
        e.preventDefault()
        if(!userInformation.email || !userInformation.password){
            setError('Please fill in all fields')
            return
        }

        setLoading(true)
        setError('')

        try {
            await login(userInformation)
            navigate(location.state?.from || '/')
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong')
            return
        } finally {
            setLoading(false)
            return
        }
    }

  return (
    <div className="m-10 p-5 flex flex-col">
        <h2 className="text-4xl font-bold text-center">Login</h2>
        <form className="mt-7 space-y-5 flex flex-col w-90 self-center justify-center" onSubmit={handleSubmit}>
            <div className="space-y-3">
                <label htmlFor="email" className='block text-2xl'>Email</label>
                <input className='border rounded-lg p-1 w-full' type="email" name="email" id="email" onChange={e => setUserInformation(state => ({ ...state, [e.target.id]: e.target.value}))} value={userInformation.email}/>
            </div>
            <div className="space-y-3">
                <label htmlFor="password" className='block text-2xl'>Password</label>
                <input className='border rounded-lg p-1 w-full' type="password" name="password" id="password" onChange={e => setUserInformation(state => ({ ...state, [e.target.id]: e.target.value}))} value={userInformation.password}/>
            </div>

            <div>
                <input type="checkbox" name="persist" id="persist" checked={rememberUser} onChange={toggleRememberUser}/>
                <label className="text-xl px-2" htmlFor="persist">Remember me</label>
            </div>
            <button className="self-center text-lg cursor-pointer border-1 p-3 px-8 mt-3 rounded-3xl" disabled={loading}> { loading ? <p>Logging in, please wait...</p> : 'Login' }</button>

        </form>
        <p className="text-red-500 text-center text-lg mt-5">{error}</p>
        <p className="text-center text-md mt-10">No account? <Link className="underline cursor-pointer" to="/register">Register</Link></p>
    </div>

  )
}
export default LoginPage