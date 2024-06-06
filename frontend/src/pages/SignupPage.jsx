import React from 'react'
import { Link } from 'react-router-dom'

function SignupPage() {
  return (
    <div>
       <div className='min-h-screen  bg-slate-300 flex sm:flex-row'>
        {/* left div */}
        <div className='h-screen w-full md:w-2/4 flex flex-col items-center   bg-white'>
           
            {/* logo */}
          
              <p className='text-xl font-bold mt-6'>Get Started New !</p>
           <div className='flex justify-center mt-14'>

           <form action="" >
               <div>
                <p className='text-sm ml-5  '>Full Name</p>
                <input type="text" name="name" id="name"  className='pl-2 mt-1 ml-4  w-72 md:w-96 h-10 rounded-lg mb-3 focus:outline-none border border-slate-300'  placeholder='  full-name'/>
               </div>
               <div>
                <p className='text-sm ml-5  '>Phone Number</p>
                <input type="text" name="number" id="number"  className='pl-2 mt-1 ml-4  w-72 md:w-96 h-10 rounded-lg mb-3 focus:outline-none border border-slate-300'  placeholder='  phone number'/>
               </div>
               <div>
                <p className='text-sm ml-5  '>Email address</p>
                <input type="email" name="email" id="email"  className='pl-2 mt-1 ml-4  w-72 md:w-96 h-10 rounded-lg mb-3 focus:outline-none border border-slate-300'  placeholder='  enter your email'/>
               </div>

               <div>
                <p className='text-sm ml-5 '>password</p>
                <input type="password" name="password" id="password" placeholder='  enter your password' className='ml-4 pl-2 mt-1 w-72 md:w-96  h-10 rounded-lg focus:outline-none border border-slate-300'/>
               </div>
              
              <div className='flex justify-center mt-5'>

               <button className='ml-3 w-72 md:w-96  h-10 rounded-lg mb-5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold'>Sign Up</button>
              </div>
            <Link to={'/login'}>
           <p className='text-xs ml-5'>Already have an account ?  <span className='text-blue-700 font-semibold hover:cursor-pointer hover:text-blue-500'>Login</span></p>
            </Link>
           </form>

           </div>
           
        </div>
        {/* right div */}
        <div className='h-screen w-2/4  items-center justify-center md:inline hidden'>


         <img src="https://videoigniter.com/wp-content/uploads/2024/01/AI-Animation-Generator-Generate-Your-Animations.png" alt="Image" className='w-full h-full object-cover'/>
        </div>
    </div>
    </div>
  )
}

export default SignupPage