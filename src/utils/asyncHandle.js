

const asyncHandle = (requestHandler)=>{
  return (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch((err)=>{next(err)})
  }
}






//same above code for checking error

// const asyncHandle = (fn) => {
//   async ()=>{
//     try{
//        await fn(req,res,next)
//     }catch(error){
//       res.status(err.code || 400).json(
//         {
//           success : false,
//           message : err.message
//         }
//       )
//     }
//   }
// }
  
export  {asyncHandle}