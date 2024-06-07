import dotenv from "dotenv"
dotenv.config({
  path:'./env'
})
import mongoose  from "mongoose"; 
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";


 connectDB()



















 
// import express from "express"

// const app = express()
// //iffie func. = turant execute kr dena function ko

// (async ()=>{

//   try{
//     await mongoose.connect(`${process.env.MONGODB_URl}/${DB_NAME}`)
//     app.on("error",(error)=>{
//       console.log("error",error);
//       throw error
//     })

//     app.listen(process.env.PORT,()=>{
//       console.log(`server is running on ${process.env.PORT} `);
//     })

//   } catch(error){
//     console.log("ERROR" ,error);
//     throw error;
//   }

// })()
  