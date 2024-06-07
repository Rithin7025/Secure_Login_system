import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { validateForm } from '../utils/ValidateFormSignUp.jsx';

function LoginPage() {
  const [formData,setFormData] = useState({email : '', password : ''});
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //handle change of input 
  const handleChange = (e) => {
    setFormError({});
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      //set the errors returned from validate form
      setFormError(validateForm(formData));
     console.log(formError)
      if (Object.keys(formError).length === 0){
     console.log('entered')
          setLoading(true);
          const res = await axios.post("/api/v1/auth/login", formData);
        const data = await res.data
        
        setLoading(false) //makes the loading effect false
        
        navigate('/')
       
      } 
      
    } catch (error) {
      setLoading(false);
      console.log(error);
      //if user with the email not found
      if(error.response?.status == 404){
        setFormError({email : 'User not found. Please check your email'})
      }
            //if the user with the email found but not the same password
            if(error.response?.status == 401){
                setFormError({password : 'Incorrect password try again'})
              }
      
    }
  };
  return (
    <div className='min-h-screen  bg-slate-300 flex sm:flex-row'>
        {/* left div */}
        <div className='h-screen w-full md:w-2/4 flex flex-col items-center   bg-white'>
            {/* logo */}
           <div className='h-36 w-44  '>
                <img src="data:image/png;base64,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" alt="" />
           </div>
              <p className='text-xl text-blue-600 font-bold'>Secure_Login 🔒</p>
              
           <div className='flex justify-center mt-14'>

           <form onSubmit={handleSubmit} >
               <div>
               {
                  formError.email ? (<p className="text-red-600 text-xs ml-5">
                  {formError.email}
                </p>)  : (<p className='text-sm ml-5  '>Email address</p>)
                }
                <input type="email" name="email" onChange={handleChange} id="email"  className={`pl-2 mt-3 ml-4  w-72 md:w-96 h-10 rounded-lg mb-2 focus:outline-none border border-slate-300`}  placeholder='  Enter your email'/>
               </div>

               <div>
               {
                  formError.password ? (<p className="text-red-600 text-xs ml-5">
                  {formError.password}
                </p>)  : (<p className='text-sm ml-5  '>password</p>)
                }
                <input type="password" onChange={handleChange} name="password" id="password" placeholder='  enter your password' className='ml-4 pl-2 mt-2 w-72 md:w-96  h-10 rounded-lg focus:outline-none border border-slate-300'/>
               </div>
              
              <div className='flex justify-center mt-5'>

               <button type='submit' disabled={loading}  className='ml-3 w-72 md:w-96  h-10 rounded-lg mb-5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold'>{loading ? "Signing in.." : "Login"}</button>
              </div>
            <Link to={'/signup'}>
           <p className='text-xs ml-5'>Do not have an account ?  <span className='text-blue-700 font-semibold hover:cursor-pointer hover:text-blue-500'>sign up</span></p>
            </Link>
           </form>

           </div>
           <p className='text-xs mt-3'>demo [email: user@gmail.com ]</p>
           <p className='text-xs' > [password: *123456As]</p>
           
        </div>
        {/* right div */}
        <div className='h-screen w-2/4  items-center justify-center md:inline hidden'>


         <img src="https://i.pinimg.com/originals/28/89/c8/2889c83d93ea4077166f42cd3306aed2.gif" alt="" className='w-full h-full object-cover'/>
        </div>
    </div>
  )
}

export default LoginPage