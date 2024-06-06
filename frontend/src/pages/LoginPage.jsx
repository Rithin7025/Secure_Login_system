import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className='min-h-screen bg-slate-300 flex sm:flex-row'>
        {/* left div */}
        <div className='h-96 w-2/4 mt-10 flex flex-col items-center'>
           
            {/* logo */}
           <div className='h-44 w-44 bg-red-400'>
                
           </div>

           <div className='flex justify-center'>

           <form action="">
               <div>
                <p className='text-sm '>  Email address</p>
                <input type="email" name="email" id="email"  className=' mt-3 w-96 h-10 rounded-lg mb-2 focus:outline-none' placeholder='Enter your email'/>
               </div>

               <div>
                <p className='text-sm'>password</p>
                <input type="password" name="password" id="password" placeholder='enter your password' className='mt-2 w-96 h-10 rounded-lg'/>
               </div>
              
              <div className='flex justify-center mt-5'>

               <button className='w-96 h-10 rounded-lg mb-2 bg-indigo-600 text-white font-semibold'>Login</button>
              </div>

           <p className='text-xs'>Do not have an account ?  <span className='text-blue-700 font-semibold'>sign up</span></p>
           </form>

           </div>
           
        </div>
        {/* right div */}
        <div className='h-96 w-2/4 mt-10 flex items-center justify-center'>


           <div className='h-40 w-64 '>

               Login here
           </div>
        </div>
    </div>
  )
}

export default LoginPage