import express from 'express'
import cookieparser from 'cookie-parser'
import cors from 'cors'

const app=express()

// Content-Type: application/json
// extended: true lets you handle complex, nested form data
app.use(express.urlencoded({extended:true}))

// application/x-www-form-urlencoded
app.use(express.json())

//allow cookies
app.use(cookieparser());

// allow requests from the servers
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


// app.use((err, req, res, next) => {
//   console.log("Global error middleware:", err);
    
//   return res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//     error: err.error || {}
//   });
// });






import  userRouter from './routes/user.routes.js'
app.use('/api/v1/user',userRouter)

import postRouter from './routes/post.routes.js'
app.use('/api/v1/post',postRouter)


app.post('/',(req,res)=>{
    console.log(req.body)
    return res.json({active:true,message:"Chal rha hai yrr"})
})





// app.options('*',cors())



export default app;