import express from 'express'

const router = express.Router();

import { userLogin,userSignup,signOut } from '../controller/user.controller.js';


//Route to handle user login
router.post('/login',userLogin);

//Route to handle user signup
router.post('/signup',userSignup);

//Route to logout
router.get('/logout',signOut);

export default router;