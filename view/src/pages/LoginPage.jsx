import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { RiLoaderFill } from "react-icons/ri"
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
            navigate('/')
            
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="m-10 p-5">
        <h2 className="text-4xl font-bold text-center">Login</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
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
                <label className="text-2xl" htmlFor="persist">Remember me</label>
            </div>
            <button className="text-2xl" disabled={loading}>{loading ? <span><RiLoaderFill /></span> : 'Login'}</button>

        </form>
        <p className="text-red-500 text-center text-lg mt-5">{error}</p>
        <p className="text-center text-lg mt-5">Don't have an account? <Link className="underline" to="/register">Register</Link></p>
    </div>

  )
}
export default LoginPage