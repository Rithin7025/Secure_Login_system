import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { validateForm }  from '../utils/ValidateForm.jsx'
import axios from 'axios';

function SignupPage() {

  const [formData,setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
 const navigate = useNavigate()

  const handleChange = (e) => {
    setFormError({});
    setFormData({
      ...formData,
      [e.target.id]: [e.target.value],
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      //set the errors returned from validate form
      setFormError(validateForm(formData));
      console.log(formError)
     
      if (Object.keys(formError).length === 0){
         console.log('entered hre')
          setLoading(true);
          const res = await axios.post("/api/v1/auth/signup", formData);
        const data = await res.data
        console.log(data)
        setLoading(false) //makes the loading effect false
       
        navigate('/login')
       
      } 
      
    } catch (error) {

      setLoading(false);
      console.log(error);
      
      if(error.response?.status == 400){
        setFormError({email : 'All feilds are required'})
      }
      if(error.response?.status == 409){
        setFormError({email : 'Email already exists'})
      }
           
      
    }
  };
  return (
    <div>
       <div className='min-h-screen  bg-slate-300 flex sm:flex-row'>
        {/* left div */}
        <div className='h-screen w-full md:w-2/4 flex flex-col items-center   bg-white'>
           
            {/* logo */}
          
              <p className='text-xl font-bold mt-6'>Get Started New !</p>
           <div className='flex justify-center mt-14'>

           <form onSubmit={handleSubmit}>
               <div>
                <p className='text-sm ml-5  '>Full Name</p>
                <input type="text" onChange={handleChange} required={true} name="name" id="name"  className='pl-2 mt-1 ml-4  w-72 md:w-96 h-10 rounded-lg mb-3 focus:outline-none border border-slate-300'  placeholder='  full-name'/>
               </div>
              
               <div>
                
                {
                  formError.email ? (<p className="text-red-600 text-xs ml-5">
                  {formError.email}
                </p>)  : (<p className='text-sm ml-5  '>Email address</p>)
                }
                <input type="email" onChange={handleChange} required={true} name="email" id="email"  className='pl-2 mt-1 ml-4  w-72 md:w-96 h-10 rounded-lg mb-3 focus:outline-none border border-slate-300'  placeholder='  enter your email'/>
               </div>

               <div>
                
               {
                  formError.password ? (<p className="text-red-600 text-xs ml-5">
                  {formError.password}
                </p>)  : (<p className='text-sm ml-5  '>password</p>)
                }
                <input type="password" onChange={handleChange} required={true} name="password" id="password" placeholder='  enter your password' className='ml-4 pl-2 mt-1 w-72 md:w-96  h-10 rounded-lg focus:outline-none border border-slate-300'/>
               </div>
              
              <div className='flex justify-center mt-5'>

               <button type='submit' className='ml-3 w-72 md:w-96  h-10 rounded-lg mb-5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold'>Sign Up</button>
              </div>
            <Link to={'/login'}>
           <p className='text-xs ml-5'>Already have an account ?  <span className='text-blue-700 font-semibold hover:cursor-pointer hover:text-blue-500'>login</span></p>
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