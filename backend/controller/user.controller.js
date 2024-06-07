import User from '../Model/user.model.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//controller to handle user sign up

export const userSignup = async (req, res, next) => {
  const { name, password, email } = req.body;
  console.log(name,password,email)
  console.log('entered controller')
  //check if any fields are missing 
  if(!name || !password || !email){
    const credentialsError = new Error('All fields are required: name, password, and email.');
    credentialsError.statusCode = 400;
    credentialsError.message = "please provide name, email and password"
   return next(credentialsError); //return the function as soon as we encounter error
  }
  //hasing entered password
  const userName = name[0];
  const userEmail = email[0];
  const userPassword = password[0];

  const hashedPassword = await bcrypt.hashSync(userPassword, 10);

  try {
    const user = new User({
      name : userName,
      email : userEmail,
      password: hashedPassword,
    });
    console.log('entered try')
    
    //saving the new User
    const newUser = await user.save();
    console.log(newUser);
    res
      .status(201)
      .json({ success: true, message: 'User signed up successfully' });
  } catch (error) {
    if (error.code == 11000 && error.keyPattern && error.keyValue.email) {
      const duplicateEmailError = new Error('Email already exists');
      duplicateEmailError.statusCode = 409;
     return next(duplicateEmailError);
    } else {
     return next(error); //passing the error to the middleware errorhandler.js
    }
  }
};

//controller to handle login
export const userLogin = async (req, res, next) => {
  try {

    console.log('entered login')
    const { email, password } = req.body;
   console.log(email,password)
   
    if(!email || !password){
      const credentialsError = new Error('All feilds are required: email and password')
      credentialsError.statusCode = 400;
      credentialsError.message = 'please provide email and password'
      return next(credentialsError)
    }
    const user = await User.findOne({ email });
    //check if the user exists
    if (!user) {
      const userNotFoundError = new Error('User not found');
      userNotFoundError.statusCode = 404;
      return next(userNotFoundError);
    }

    //compares the passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const incorrectPasswordError = new Error('Incorrect Password');
      incorrectPasswordError.statusCode = 401;
      return next(incorrectPasswordError);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWTSECRET, {
      expiresIn: '1h',
    });
    console.log(token, 'here is the token 👏');
    const { password: pass, ...userInfo } = user._doc;

    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json({ success: true, message: 'Logged In successfully', userInfo });
    
  } catch (error) {
    return next(error);
  }
};



//controller to logout
export const signOut = (req,res) => {
  try {
    console.log('entered sign out')
    res.clearCookie('access_token');
    res.clearCookie('session_cookie');
    res.status(200).json({message : "User has been logged out"})
  } catch (error) {
    console.log(error)
  }
}