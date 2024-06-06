import mongoose from "mongoose";
import  'dotenv/config'

//connection to DB
const connectDB = async () => {
    try{

        const conn = await mongoose.connect(process.env.DB_CONNECTION_STRING );
        
        console.log(`MongoDB connected : ${conn.connection.host}`)

    }catch(error){
     console.log('DB error : ',error);
     process.exit(1)
    }
}

export default connectDB