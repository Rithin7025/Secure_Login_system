import User from '../Model/user.model.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//controller to handle user sign up

export const userSignup = async (req, res, next) => {
  const { name, password, email } = req.body;
  //hasing entered password
  const hashedPassword = await bcrypt.hashSync(password, 10);

  try {
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    //saving the new User
    const newUser = await user.save();
    console.log(newUser);
    res
      .status(201)
      .json({ success: true, message: 'User signed up successfully' });
  } catch (error) {
    if (error.code == 11000 && error.keyPattern && error.keyValue.email) {
      const duplicateEmailError = new Error('Email already exists');
      duplicateEmailError.statusCode = 400;
      next(duplicateEmailError);
    } else {
      next(error); //passing the error to the middleware errorhandler.js
    }
  }
};

//controller to handle login
export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    //check if the user exists
    if (!user) {
      const userNotFoundError = new Error('User not found');
      userNotFoundError.statusCode = 404;
      return next(userNotFoundError);
    }

    //compares the passwords
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
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
    res.status(200).json({
      success: true,
      message: 'User signed in succesfully',
    });
  } catch (error) {
    return next(error);
  }
};
