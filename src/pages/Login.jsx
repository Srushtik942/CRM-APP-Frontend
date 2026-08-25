import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginBanner from '../assets/LoginBanner.png';
import axiosInstance from '../api/axiosInstance'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await axiosInstance.post('/auth/login', formData)
      const responseData = response.data || {}
      const user = responseData.user || responseData.data?.user || responseData.data || responseData

      localStorage.setItem('user', JSON.stringify({
        name: user.name || user.username || '',
        email: user.email || formData.email,
      }))
      navigate('/dashboard')
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Unable to log in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
      <div className='flex min-h-screen w-full '>
        {/* left panel */}
        <div className='hidden md:flex md:w-1/2 bg-[#00441B] items-center justify-center p-10 rounded-xl'>
            <div className='text-center text-white'>
                <img src={LoginBanner} alt='Login Banner'
                className="max-w-md mx-auto mb-6"/>
          <h2 className="text-2xl font-semibold">Welcome to Anvaya</h2>
          <p className="text-green-100 mt-2">Manage your leads, effortlessly.</p>
            </div>
        </div>
        {/* right panel */}
    <div className="flex w-full md:w-1/2 items-center justify-center bg-white p-8">
     <div className="w-full max-w-sm">
        <h1 className="font-bold text-3xl text-center text-[#00441B] mb-8">Login to Anvaya</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
            {error && <p className="text-center text-sm font-medium text-red-600">{error}</p>}
            <div>
                <label className="block text-sm font-medium text-green-900 mb-1">Email</label>
                <input type='email' name="email" value={formData.email} onChange={handleChange} required placeholder='alex@gmail.com'
                className="w-full px-4 py-2 border border-green-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00441B]"/>
            </div>

             <div>
              <label className="block text-sm font-medium text-green-900 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="password@12"
                className="w-full px-4 py-2 border border-green-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00441B]"
              />
            </div>

             <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00441B] text-white font-semibold py-2 rounded-lg hover:bg-[#00341A] transition"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
        </form>
        <p className="text-center text-sm text-green-900 mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#00441B] font-medium hover:underline">
              Sign up
            </a>
          </p>
     </div>
    </div>
    </div>



  )
}

export default Login
