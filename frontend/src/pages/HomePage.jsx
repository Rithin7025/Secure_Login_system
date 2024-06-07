import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function HomePage() {
const navigate = useNavigate()

const handleLogout = async () => {
  try{
    console.log('logout')
    await axios.get('/api/v1/auth/logout');
    navigate('/login')
  }catch(error){
    console.log(error)
  }
}

  return (
    <div>

    <div className='h-screen w-screen bg-gradient-to-r from-pink-700 via-purple-600 to-blue-500 flex items-center justify-center' >
      <button onClick={handleLogout} className='mb-96 ml-96 p-5 w-44 rounded-lg text-white font-bold  bg-blue-800 '>Logout</button>
      <div className='ml-32'>

        
         <p className='text-6xl text-white font-bold'>
          Hey user
         </p>
         <p className=' text-xl  font-semibold mt-3'> welcome home !!</p>
      </div>
    </div>
    </div>
  )
}

export default HomePage