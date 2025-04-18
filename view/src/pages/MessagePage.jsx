// Send a message page

import { useState } from "react"
import axios from "../axios_api/axios"

const MessagePage = () => {

   const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = e => {
    setFormData(state => ({
      ...state,
      [e.target.id]: e.target.value
    }))
    console.log(formData)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(formData.name === '' || formData.email == ''  || formData.message == '') {
        setError('Please fill in all fields')
        setMessage('')
        return
    } 

    try {
      const response = await axios.post('api/messages', formData)

      if(response.status !== 200) return
            
      setFormData({
         name: '',
         email: '',
         message: ''
      })
      setError('')
      setMessage('Message succesfully submitted!')

      return
                    
    } catch (error) {
        setError(error.response?.data?.message || 'Something went wrong')
        setMessage('')
        console.log(error)
    } 
  }

  // Message form
  return (
    <div className='m-auto my-50 flex align-items center-items'>

    <div className='flex m-auto align-middle justify-center'>
        <form id="messageForm" onSubmit={handleSubmit}>
            <h2 className='text-2xl p-5 my-5'>Send a messsage to us!</h2>
            <div className='flex flex-col'>
              <label htmlFor="name">Name: *</label>
              <input className="border-1 border-solid rounded-md mb-5" type="text" name="name" id="name" value={formData.name} onChange={handleChange}/>

              <label htmlFor="email">Email: *</label>
              <input className="border-1 border-solid rounded-md mb-5" type="email" name="email" id="email" value={formData.email} onChange={handleChange}/>

              <label htmlFor="message">Message: *</label>
              <textarea className="border-1 border-solid rounded-md mb-5" name="message" id="message" value={formData.message} onChange={handleChange}/>

              <p className="text-red-500 text-center text-lg mt-5">{error}</p>
              <p className="text-center text-lg mt-5">{message}</p>
              <button className="p-4 m-4 bg-cyan-700 border-none rounded-md cursor-pointer">Send</button>
            </div>
        </form>
      </div>

    </div>
  )
}
export default MessagePage