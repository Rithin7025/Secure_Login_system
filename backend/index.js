import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import errorMiddleware from './middleware/errorMiddleware.js'

const app = express();
connectDB();

import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './Routes/auth.routes.js';

//cors setting 
app.use(cors({
    origin : ["http://localhost:3000"],
    methods : ["GET","PUT","POST","DELETE","PATCH"],
    credentials : true
}));

app.use(express.json());
//to parse incoming body requests
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes);

app.get('/',(req,res)=> {
    res.end('test')
})

app.listen(3000,()=> {
    console.log('server started ')
});

//executed when the next middleware is called from controller

app.use(errorMiddleware)