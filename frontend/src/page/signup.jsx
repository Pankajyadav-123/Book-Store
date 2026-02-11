import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {

  
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        
          
          const response = await axios.post(backendUrl + '/api/user/signup',{name,email,password})
          if (response.data.success) {
            toast.success('Signup successful! Please login now.')
            navigate('/login')
          } else {
            toast.error(response.data.message)
          }

       

        } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

 
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>Signup</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>
        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
        <input onChange={(e)=>setPasword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p onClick={()=>navigate('/login')} className='cursor-pointer'>--Login--</p>
        </div>
        <button className='bg-emerald-600 hover:bg-stone-900 text-white font-light px-8 py-2 mt-4'>Signup</button>
    </form>
  )
}

export default Signup
