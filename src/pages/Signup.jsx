import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import axiosInstance from '../api/axiosInstance'
import { useNavigate } from "react-router-dom";


const Signup = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setError('')
    try {
    const data =  await axiosInstance.post('/auth/signup', formData);
    console.log("data",data);
      setFormData({ name: '', email: '', password: '' })
      toast.success('Signup successful!')
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || 'Unable to sign up. Please try again.')
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-hidden rounded-xl bg-[#003516] md:flex-row">
      <style>{`
        @keyframes floatBlob { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(24px, -20px) scale(1.12); } }
        @keyframes revealWord { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes formReveal { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: translateX(0); } }
        .signup-blob { animation: floatBlob 8s ease-in-out infinite; }
        .signup-word { opacity: 0; animation: revealWord .7s ease-out forwards; }
        .signup-form { animation: formReveal .7s ease-out both; }
      `}</style>

      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#086b38]/50 blur-3xl signup-blob" />
      <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-[#0b8247]/30 blur-3xl signup-blob" style={{ animationDelay: '-3s' }} />

      <section className="relative hidden w-full flex-col justify-center px-8 text-white md:flex md:w-1/2 lg:px-16">
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-green-200">CRM platform</p>
        <h2 className="whitespace-nowrap text-3xl font-bold leading-tight text-yellow-300 lg:text-5xl">
          {['Welcome', 'to', 'Clientix'].map((word, index) => (
            <span key={word} className="signup-word mr-3 inline-block" style={{ animationDelay: `${index * 180}ms` }}>{word}</span>
          ))}
        </h2>
        <p className="mt-6 max-w-md text-base leading-relaxed text-green-100 lg:text-lg">Build stronger customer relationships and grow your business from one simple workspace.</p>
      </section>

      <section className="relative flex w-full items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:w-1/2">
        <div className="signup-form w-full rounded-3xl bg-white p-8 shadow-2xl md:p-10">
          <h1 className="mb-2 text-center text-3xl font-bold text-[#00441B]">Create your account</h1>
          <p className="mb-8 text-center text-sm text-slate-500">Get started with Clientix today</p>

      <form onSubmit={handleSubmit} className='space-y-5'>
        {error && <div className='rounded-lg bg-red-50 p-3 text-center text-sm font-semibold text-red-600'>{error}</div>}

        <div>
          <label className='mb-2 block text-sm font-semibold text-green-900'>Username</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full rounded-lg border border-green-200 px-3 py-3 text-green-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-[#00441B]'
            required
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold text-green-900'>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className='w-full rounded-lg border border-green-200 px-3 py-3 text-green-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-[#00441B]'
            required
          />
        </div>

        <div>
          <label className='mb-2 block text-sm font-semibold text-green-900'>Password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            className='w-full rounded-lg border border-green-200 px-3 py-3 text-green-900 transition-shadow focus:outline-none focus:ring-2 focus:ring-[#00441B]'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full rounded-lg bg-[#00441B] py-3 font-semibold text-white transition-colors hover:bg-[#00341A]'
        >
          Sign Up
        </button>
      </form>
          <p className="mt-6 text-center text-sm text-slate-600">Already have an account? <a href="/login" className="font-semibold text-[#00441B] hover:underline">Log in</a></p>
        </div>
      </section>
    </div>
  )
}

export default Signup
